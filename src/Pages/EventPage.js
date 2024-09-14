import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IpAdress from '../Config/IpAdress';

const EventPage = () => {
  const { token } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const ip = IpAdress.ip

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${ip}/event/${token}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setEventData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEventData();
  }, [token]);

  if (error) return <div>Error: {error}</div>;
  if (!eventData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{eventData.event.title}</h1>
      <p>{eventData.event.city}</p>
      {/* Render guests and tickets */}
    </div>
  );
};

export default EventPage;
