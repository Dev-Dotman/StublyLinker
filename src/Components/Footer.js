import React from 'react';

function Footer(props) {
    return (
        <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Stubly. All rights reserved.</p>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about-us">About Us</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/refund-policy">Refund Policy</a>
          </div>
          <div className="footer-contact">
            <p>
              Contact us at:{" "}
              <a href="mailto:support@stubly.com">support@stubly.com</a>
            </p>
            <p>
              Phone: <a href="tel:+1234567890">+1 234 567 890</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Follow us on:</p>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    );
}

export default Footer;