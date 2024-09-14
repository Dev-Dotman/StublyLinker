import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IpAdress from '../Config/IpAdress';
import EventDetails from './EventDetails';

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
        console.log(data)
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
      <EventDetails event={eventData.event} guests={eventData.guests} tickets={eventData.tickets} />;
    </div>
  );
};

export default EventPage;
