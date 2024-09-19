import React, { useContext, useState, useEffect } from "react";
import "./EventSearchPage.css";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Contexts/AuthProvider";
import Footer from "../Components/Footer";
import IpAdress from "../Config/IpAdress";
import {
  FaSearch,
  FaDollarSign,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";

const EventSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Title"); // State for the active filter
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30); // Default items per page for desktop view
  const ip = IpAdress.ip;
  const { events } = useContext(AuthContext);

  // Adjust items per page based on screen size (responsive for mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(5); // Mobile view
      } else {
        setItemsPerPage(30); // Desktop view
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check for screen size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ensure that events is an array before proceeding
  const filteredEvents = Array.isArray(events)
    ? events.filter((eventObj) => {
        const event = eventObj?.event;
        const ticket =
          eventObj?.tickets?.length > 0 ? eventObj.tickets[0] : null;
        const guest = eventObj?.guests?.length > 0 ? eventObj.guests[0] : null;
        let match = true;

        // Apply filter based on the active filter
        switch (activeFilter) {
          case "Title":
            if (
              searchQuery &&
              !event?.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              match = false;
            }
            break;
          case "Price":
            if (searchQuery && ticket && ticket.price > parseInt(searchQuery)) {
              match = false;
            }
            break;
          case "Location":
            if (
              searchQuery &&
              event?.city.toLowerCase() !== searchQuery.toLowerCase()
            ) {
              match = false;
            }
            break;
          case "Date":
            if (searchQuery && new Date(event?.date) < new Date(searchQuery)) {
              match = false;
            }
            break;
          case "Category":
            if (
              searchQuery &&
              !event?.category.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              match = false;
            }
            break;
          default:
            break;
        }

        return match;
      })
    : []; // Default to an empty array if events is not an array

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOpen = async (url) => {
    // Redirect to Paystack payment page
    window.location.href = url;
  };

  // Icon mapping for different filters
  const getIcon = () => {
    switch (activeFilter) {
      case "Title":
        return <FaSearch className="search-icon" />;
      case "Price":
        return <FaDollarSign className="search-icon" />;
      case "Location":
        return <FaMapMarkerAlt className="search-icon" />;
      case "Date":
        return <FaCalendarAlt className="search-icon" />;
      case "Category":
        return <FaTags className="search-icon" />;
      default:
        return <FaSearch className="search-icon" />;
    }
  };

  return (
    <>
      <div className="container2">
        <Navbar style={"navbar"} />
        <section className="search-section">
          <div className="combined-search">
            <div className="search-container">
              {getIcon()} {/* Dynamically render the icon */}
              <input
                type="text"
                id="combined-search-bar"
                placeholder={`${activeFilter}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="custom-dropdown">
              <button
                className="dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {activeFilter} <span className="arrow">&#9662;</span>
                {dropdownOpen && (
                  <ul className="dropdown-list">
                    {[
                      "Filter by..",
                      "Title",
                      "Price",
                      "Location",
                      "Date",
                      "Category",
                    ].map((filter) => (
                      <li
                        key={filter}
                        onClick={() => {
                          setActiveFilter(filter);
                          setDropdownOpen(false);
                        }}
                        className={`dropdown-item ${
                          activeFilter === filter ? "active" : ""
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            </div>
          </div>
        </section>

        <section className="events-section">
          {paginatedEvents.map((eventObj) => {
            const event = eventObj.event;
            console.log("eventtt", eventObj.guests);
            const ticket =
              eventObj.tickets.length > 0 ? eventObj.tickets[0] : null;
            const guests =
              eventObj.guests.length > 0 ? eventObj.guests[0] : null;
            return (
              <div
                className="event-card"
                key={event.id}
                style={{ backgroundImage: `url(${event.imageUrl})` }} // Dynamically set the background image
                onClick={() =>
                  handleOpen(`${IpAdress.ip2}/event/${event.url}`)
                }
              >
                <div className="image-overlay"></div> {/* Darkening overlay */}
                <div className="event-content">
                  <h3>{event.title}</h3>
                </div>
                <div className="event-details">
                  <img
                    className="guest-photo2"
                    src={`${ip}/uploads/${guests.photo}`}
                    alt={guests.name}
                  />
                  <div className="details-left">
                    <p>
                      {event.state}, {event.city}
                    </p>
                    <p>{new Date(event.date).toDateString()} </p>
                    <p>
                      {event.description
                        ? event.description.substring(
                            0,
                            window.innerWidth <= 768 ? 20 : 30
                          )
                        : ""}
                      ...
                    </p>
                  </div>
                  <button
                    className="view-button"
                    onClick={() =>
                      handleOpen(`${IpAdress.ip2}/event/${event.url}`)
                    }
                  >
                    More Details
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        <section className="pagination-section">
          <div className="pagination-controls">
            <button
              className="prev-button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="next-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default EventSearchPage;
