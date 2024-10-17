import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { API_ENDPOINTS } from "../api";

const GroupForm = ({ setGroups }) => {
  const [groupData, setGroupData] = useState({
    name: "",
    members: [],
  });

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await axios.get(API_ENDPOINTS.MEMBERS);
      setMembers(
        response.data.map((member) => ({
          value: member._id,
          label: member.name,
        }))
      );
    };

    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setGroupData({ ...groupData, members: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINTS.GROUPS, groupData);
      setGroups((prev) => [...prev, response.data]);

      // Reset form fields
      setGroupData({ name: "", members: [] });
    } catch (error) {
      console.error(error);
      alert("Error creating group");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Group Name"
        value={groupData.name}
        onChange={handleChange}
        required
      />

      {/* Multi-Select for Members */}
      <Select
        isMulti
        options={members}
        onChange={handleSelectChange}
        placeholder="Select Members"
      />

      <button type="submit">Add Group</button>
    </form>
  );
};

export default GroupForm;
