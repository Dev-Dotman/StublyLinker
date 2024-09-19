import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import IpAdress from "../Config/IpAdress";
import Colors from "../Config/Colors";
import { fetchWithAuth } from "../Services/fetchHelper";

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [colors, setColors] = useState([]);
  const [theme, setTheme] = useState(true);
  const [reload, setReload] = useState(false);
  const [events, setEvents] = useState([]);
  const ip = IpAdress.ip;

  const getThemeColors = async () => {
    try {
      const theme = localStorage.getItem("theme");
      // const theme = 'dark';
      theme === "dark" ? setTheme(false) : setTheme(true);
      return theme === "dark"
        ? setColors(Colors.dark)
        : setColors(Colors.light);
    } catch (error) {
      console.error("Error fetching theme from AsyncStorage:", error);
      setTheme(true);
      return setColors(Colors.light); // default to light theme
    }
  };

  const handleFetch = async (mail) => {
    try {
      const response = await fetch(`${ip}/events2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ creator: mail }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      
      // Sort events by creation date (optional)
      const sortedEvents = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      // Fetch images for each event
      const eventsWithImages = await Promise.all(
        sortedEvents.map(async (eventObj) => {
          // Fetch image for each event using the event's image path
          const event = eventObj.event;
          console.log(eventObj.event.eventImage)
          const imageUrl = await fetchImage(eventObj.event.eventImage);
          return { ...eventObj, event: { ...event, imageUrl } }; // Add imageUrl to each event object
        })
      );
  
      setEvents(eventsWithImages); // Update the state with events including image URLs
      console.log(eventsWithImages); // Log the events with images
  
    } catch (err) {
      console.log(err.message);
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    getThemeColors();
    handleFetch('thatguy')
  }, []);

  useEffect(() => {
    // Perform any necessary cleanup when component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const login = async (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    console.log("logged in")
    setIsAuthenticated(true);
    navigate("/", { state: { user: decoded } });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/LoginSignup");
  };

  const refreshApp = () => {
    setReload(true);
    getThemeColors();
    setTimeout(() => {
      setReload(false);
    }, 200);
  };


  
  const fetchImage = async (imagePath) => {
    try {
      const response = await fetchWithAuth(`${ip}/get-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath }),
      });
  
      if (response.ok) {
        const imageBlob = await response.blob();
        return URL.createObjectURL(imageBlob);
      } else {
        console.error("Failed to fetch image:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        colors,
        theme,
        refreshApp,
        reload,
        events
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
