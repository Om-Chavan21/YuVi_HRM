import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { API_ENDPOINTS } from "../api";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import { toast } from "react-toastify"; // Import toast for notifications

const EditGroup = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const navigate = useNavigate(); // Initialize useNavigate
  const [groupData, setGroupData] = useState({ name: "", members: [] });
  const [allMembers, setAllMembers] = useState([]); // To hold all members for selection
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchGroup = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`${API_ENDPOINTS.GROUPS}/${id}`);
        console.log("Fetched group data:", response.data); // Log fetched group data

        // Set group data and format members to only include IDs
        setGroupData({
          ...response.data,
          members: response.data.members.map((member) => member._id), // Extract only IDs for members
        });

        // Fetch all members for multi-select
        const memberResponse = await axios.get(API_ENDPOINTS.MEMBERS);
        console.log("Fetched members:", memberResponse.data); // Log fetched members
        setAllMembers(
          memberResponse.data.map((member) => ({
            value: member._id,
            label: member.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching group data:", error);
        toast.error("Error fetching group data"); // Show error notification
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchGroup();
  }, [id]);

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value) // Store only IDs
      : [];
    setGroupData({ ...groupData, members: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await axios.patch(`${API_ENDPOINTS.GROUPS}/${id}`, groupData);
      toast.success("Group updated successfully"); // Show success notification

      // Update each member's member_of array based on changes in group membership
      await Promise.all(
        allMembers.map(async (member) => {
          if (groupData.members.includes(member.value)) {
            // If the member is included in the updated group members, add the group ID
            await axios.patch(`${API_ENDPOINTS.MEMBERS}/${member.value}`, {
              $addToSet: { member_of: id }, // Add this group ID to the member's member_of array
            });
          } else {
            // If the member is not included in the updated group members, remove the group ID
            await axios.patch(`${API_ENDPOINTS.MEMBERS}/${member.value}`, {
              $pull: { member_of: id }, // Remove this group ID from the member's member_of array
            });
          }
        })
      );

      navigate("/groups"); // Navigate to groups page after successful update
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("Error updating group"); // Show error notification
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Group</h2>
      {loading && <p>Loading...</p>} {/* Show loading message */}
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
        options={allMembers} // Use allMembers as options for selection
        value={allMembers.filter((member) =>
          groupData.members.includes(member.value)
        )} // Set selected options based on current group's members (IDs)
        onChange={handleSelectChange}
        placeholder="Select Members"
      />
      {/* Submit Button */}
      <button type="submit" disabled={loading}>
        Update Group
      </button>
    </form>
  );
};

export default EditGroup;
