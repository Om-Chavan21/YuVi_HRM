import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import { API_ENDPOINTS } from "../api";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get(API_ENDPOINTS.EVENTS);
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <EventForm setEvents={setEvents} />
      <EventList events={events} />
    </div>
  );
};

export default Events;
