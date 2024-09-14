import React from "react";
import "./EventPage.css"; // Import the CSS file
import IpAdress from "../Config/IpAdress";

const EventPage = ({ event, guests, tickets }) => {
  const {
    title,
    description,
    eventImage,
    city,
    state,
    date,
    startTime,
    endTime,
    address,
    creator,
    landmark,
  } = event;
  const ip = IpAdress.ip

  return (
    <div className="event-page">
      {/* Event Details Section */}
      <div className="event-header">
        <img
          className="event-image"
          src={`${ip}/uploads/${eventImage}`}
          alt={`${title} event`}
        />
        <div className="event-info">
          <h1>{title}</h1>
          <div className="event-description-box">
            <p className="event-description">{description}</p>
          </div>
          <p>
            <strong>Date:</strong> {new Date(date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {startTime} - {endTime}
          </p>
          <p>
            <strong>Location:</strong> {address}, {landmark}, {city}, {state}
          </p>
          <p>
            <strong>Organizer:</strong> {creator}
          </p>
        </div>
      </div>

      {/* Guests Section */}
      <div className="guests-section">
        <h2>Guests</h2>
        <div className="guests-list">
          {guests.map((guest) => (
            <div key={guest.id} className="guest-card">
              <img
                className="guest-photo"
                src={`${ip}/uploads/${guest.photo}`}
                alt={guest.name}
              />
              <div>
                <p className="guest-name">{guest.name}</p>
                <p className="guest-title">{guest.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tickets Section */}
      <div className="tickets-section">
        <h2>Tickets</h2>
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h3>{ticket.name}</h3>
              <p>
                Price: {ticket.currency} {ticket.price}
              </p>
              <p>{ticket.quantity} left</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Purchase Ticket Button */}
      <a href="#purchase" className="purchase-button">
        Purchase Ticket
      </a>
    </div>
  );
};

export default EventPage;
