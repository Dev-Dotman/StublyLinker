import React, { useContext, useState } from "react";
import "./EventPage.css"; // Import the CSS file
import IpAdress from "../Config/IpAdress";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Contexts/AuthProvider";

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
  const { user, isAuthenticated } = useContext(AuthContext);

  const ip = IpAdress.ip;
  const serviceFee = 300; // Additional service fee
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleTicketSelection = (ticket) => {
    if (!user && !isAuthenticated) {
      alert("You need to sign in to purchase a ticket.");
      // Redirect to login page or show sign-in modal (if applicable)
      return;
    }

    setSelectedTicket(ticket);
    setTotalPrice(ticket.price + serviceFee);
    setShowConfirmation(true); // Show the modal when a ticket is selected
  };

  const handlePurchaseClick = async (ticket) => {
    // Example user data, replace with actual logged-in user info
    const userEmail = "customer@example.com";

    try {
      // Initialize payment via backend
      const response = await fetch("/api/paystack/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: ticket.id,
          price: ticket.price,
          userEmail: userEmail,
          organizerSubaccount: event.organizerSubaccount, // Use organizer's subaccount from event data
        }),
      });

      const { paymentUrl } = await response.json();

      // Redirect to Paystack payment page
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };

  return (
    <div
      className="event-page"
      style={{
        backgroundImage: `url(${ip}/uploads/${eventImage})`,
      }}
    >
      <Navbar style={"navbar2"} />
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
              {/* Click to Purchase text for each ticket */}
              <div
                className="clickButton"
                onClick={() => handleTicketSelection(ticket)}
              >
                <p className="click-to-purchase">Purchase</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket Confirmation Modal */}
      {selectedTicket && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h2>Confirm Your Purchase</h2>
            <table className="confirmation-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Ticket:</strong>
                  </td>
                  <td>{selectedTicket.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Price:</strong>
                  </td>
                  <td>
                    {selectedTicket.currency} {selectedTicket.price}
                  </td>
                </tr>
                <tr>
                  <td>Service Fee:</td>
                  <td>₦300</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total:</strong>
                  </td>
                  <td>
                    {selectedTicket.currency} {selectedTicket.price + 300}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="button-group">
              <button
                onClick={() => handlePurchaseClick(selectedTicket)}
                className="confirm-button"
              >
                Proceed to Payment
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
