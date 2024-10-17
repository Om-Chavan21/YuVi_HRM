import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Import Select for multi-select dropdowns
import { API_ENDPOINTS } from "../api";

const EventForm = ({ setEvents }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    groups: [],
  });

  const [availableGroups, setAvailableGroups] = useState([]); // State for available groups

  // Fetch available groups when component mounts or updates if necessary.
  useEffect(() => {
    async function fetchGroups() {
      const response = await axios.get(API_ENDPOINTS.GROUPS);
      setAvailableGroups(
        response.data.map((group) => ({ value: group._id, label: group.name }))
      );
    }
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setEventData({ ...eventData, groups: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINTS.EVENTS, eventData);
      setEvents((prev) => [...prev, response.data]);
      setEventData({
        title: "",
        description: "",
        date: "",
        groups: [],
      });
    } catch (error) {
      console.error(error);
      alert("Error creating event");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={eventData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={eventData.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={eventData.date.split("T")[0]}
        onChange={handleChange}
        required
      />

      {/* Multi-Select for Groups */}
      <Select
        isMulti
        options={availableGroups}
        onChange={handleSelectChange}
        placeholder="Select Groups"
      />

      {/* Submit Button */}
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
