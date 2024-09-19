import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaPowerOff, FaTimes, FaUserCircle } from "react-icons/fa"; // Importing the FaBars icon from react-icons
import { AuthContext } from "../Contexts/AuthProvider";

function Navbar({ style }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1200);

  // Add event listener to detect screen size changes
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={style}>
      <div className="navbar-container">
        <div className="logo">Stubly</div>
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <a href="#home" onClick={() => navigate("/")}>
            Home
          </a>
          {style !== "navbar2" ? (
            <>
              <a href="#about-us">About Us</a>
              <a href="#features">Features</a>
            </>
          ) : (
            ""
          )}
          <a onClick={() => navigate("/Discover")}>Discover</a>

          {/* Show email in the dropdown for smaller screens */}
          {isMenuOpen && isAuthenticated && (
            <div
              style={{
                width: "auto",
                border: "2px solid white",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                borderRadius: 20,
                display: "flex",
                justifyContent: "space-around",
                maxWidth: 300,
                margin: "0 auto",
              }}
            >
              <FaUserCircle
                size={24}
                color="#004080"
                style={{ marginRight: 5 }}
              />
              {user.email}
            </div>
          )}

          {/* Show the Logout link in the dropdown for smaller screens */}
          {isMenuOpen && isAuthenticated && <a onClick={logout}>Logout</a>}

          {/* Show Sign In link if user is not authenticated */}
          {isMenuOpen && !isAuthenticated && (
            <a onClick={() => navigate("/LoginSignup")}>Sign In</a>
          )}
        </div>

        {/* Hamburger menu for small screens */}
        <div className="holder">
          <div className="logo2">Stubly</div>
          <div className="hamburger" onClick={toggleMenu}>
            {!isMenuOpen ?
              <FaBars size={24} color={style !== "navbar2" ? "#004080" : "white"} /> : 
            <FaTimes size={24} color={style !== "navbar2" ? "#004080" : "white"} />
            }
          </div>
        </div>

        {/* Show user email and logout on larger screens (>=1200px) */}
        {isLargeScreen && isAuthenticated ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "auto",
              border: "2px solid white",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <div
              style={{
                marginRight: 10,
                padding: 10,
                borderRadius: 15,
                backgroundColor: "#004080",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={logout}
            >
              Logout
            </div>
            <FaUserCircle
              size={24}
              color="#004080"
              style={{ marginRight: 5 }}
            />
            {user.email}
          </div>
        ) : (
          <div className="sign-in">
            <a onClick={() => navigate("/LoginSignup")}>Sign In</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
