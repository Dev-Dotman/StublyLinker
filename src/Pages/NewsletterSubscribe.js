import React from 'react';
import './NewsletterSubscribe.css'; // Import external CSS

const NewsletterSubscribe = () => {
  return (
    <div className="subscribe-container">
      <h2 className="subscribe-heading">Subscribe to our Newsletter</h2>
      <h4 className="subscribe-heading">Don't worry we wont send you unnecessary emails :)</h4>
      <div className="subscribe-form">
        <input type="email" placeholder="Enter your email" className="subscribe-input" />
        <button className="subscribe-button">Subscribe</button>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;
