import React, { useState } from "react";
import "./HomePage.css"; // Import the CSS file
import palm from "../images/palmtree.svg";
import palm2 from "../images/palmtree2.svg";
import NewsletterSubscribe from "./NewsletterSubscribe";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Homepage = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="homepage">
      <Navbar style={"navbar"}/>

      {/* GIF Section */}
      <div className="gif-section" id="home">
        <div className="gif-item">
          <div className="gif-text animated-text">
            <h2>Discover Events And Meet People Like Never Before!</h2>
            <button
              style={{
                width: "40%",
                padding: 10,
                backgroundColor: "orange",
                borderColor: "white",
                boxShadow: 0,
                borderWidth: 0,
                borderRadius: 10,
                color: "white",
              }}
              onClick={() => navigate("Discover")}
            >
              Discover
            </button>
          </div>
          <img
            src={require("../images/event2345.gif")}
            alt="Event GIF"
            className="gif-image"
          />
        </div>
      </div>

      {/* About Us Section */}
      <section className="about-us" id="about-us">
        <div className="section-content">
          <h2>About Us</h2>
          <p>
            Stubly helps you create, manage, and discover events with ease. Our
            platform provides a seamless experience for both organizers and
            attendees.
          </p>
          <button
            style={{
              width: "auto",
              padding: 10,
              backgroundColor: "white",
              borderColor: "white",
              boxShadow: 0,
              borderWidth: 0,
              borderRadius: 10,
              color: "lightsalmon",
              fontSize: 16,
              marginTop: 20,
            }}
          >
            Read more
          </button>
        </div>
        <img
          src={require("../images/DoogieDoodle.png")}
          alt="Event GIF"
          className="gif-image"
        />
      </section>
      <img
        src={palm}
        alt="Event GIF"
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
        }}
        width={300}
        className="palm"
      />
      <img
        src={palm2}
        alt="Event GIF"
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
        }}
        width={300}
        className="palm"
      />

      {/* Main Features Section */}
      <section className="features" id="features">
        <h2>Main Features</h2>
        <div className="features-content">
          <div className="feature-box">
            <img
              src={require("../images/undraw_Launching_re_tomg.png")}
              alt="Easy Event Creation"
            />
            <h3>Easy Event Creation</h3>
            <p>
              Create and manage events effortlessly with our intuitive
              interface.
            </p>
          </div>
          <div className="feature-box">
            <img
              src={require("../images/undraw_Scooter_re_lrsb.png")}
              alt="Seamless Ticketing"
            />
            <h3>Seamless Ticketing</h3>
            <p>Sell tickets and track sales in real-time.</p>
          </div>
          <div className="feature-box">
            <img
              src={require("../images/undraw_Setup_analytics_re_foim.png")}
              alt="Real-time Analytics"
            />
            <h3>Real-time Analytics</h3>
            <p>Get insights into attendee behavior and event performance.</p>
          </div>
          <div className="feature-box">
            <img
              src={require("../images/undraw_Reminders_re_gtyb.png")}
              alt="Event Reminders"
            />
            <h3>Event Reminders</h3>
            <p>
              Send automated reminders to attendees before the event starts.
            </p>
          </div>
          <div className="feature-box">
            <img
              src={require("../images/undraw_Social_girl_re_kdrx.png")}
              alt="Social Media Integration"
            />
            <h3>Social Media Integration</h3>
            <p>Promote your events across social media platforms.</p>
          </div>
        </div>
      </section>

      {/* Check Our App Section */}
      <section className="app-section" id="app">
        <div className="app-content">
          <div className="app-text">
            <h2>Download Our Mobile App</h2>
            <p>
              Get the Stubly app to buy tickets and stay connected with events
              on the go!
            </p>
            <p>
              With the built in organizer dashboard, get access to features like
              Qrcode check-ins, on the go event creation and much more
            </p>
            <p>Available on the App Store and Google Play.</p>
            <div className="app-buttons">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                  alt="App Store"
                  className="store-badge"
                />
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Store"
                  className="store-badge"
                />
              </a>
            </div>
          </div>

          <div className="app-image">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-phone"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg> */}
            <img
              src={require("../images/undraw_undraw_apps_bqvc_(1)_kcl1.png")}
              alt="Seamless Ticketing"
              style={{
                borderRadius: 100,
              }}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          width: "100%",
          height: "50vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        <NewsletterSubscribe />
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Homepage;
