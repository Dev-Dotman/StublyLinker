import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IpAdress from '../Config/IpAdress';
import EventDetails from './EventDetails';

const EventPage = () => {
  const { token } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const ip = IpAdress.ip
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${ip}/event/${token}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setEventData(data);
        console.log(data)
      } catch (err) {
        setError(err.message);
      } finally{
        setLoading(false)
      }
    };

    fetchEventData();
  }, [token]);

  if (error) return <div style={{
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
  }}>sorry we couldn't make that happen</div>
  if (!eventData) return <div>{loading && (
    <div className="loading-overlay">
      <div className="backg">
        <div className="spinner"></div>
      </div>
    </div>
  )}</div>

  return (
    <div>
      <EventDetails event={eventData.event} guests={eventData.guests} tickets={eventData.tickets} />
    </div>
  );
};

export default EventPage;
