import React from "react";

const EventList = ({ events }) => {
  return (
    <ul className="list-group mt-3">
      {events.map((event) => (
        <li key={event._id} className="list-group-item">
          {event.title}
        </li>
      ))}
    </ul>
  );
};

export default EventList;
