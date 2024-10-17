import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { API_ENDPOINTS } from "../api";
import { toast } from "react-toastify"; // Import toast for notifications
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

const EditMember = ({ open, onClose, id, refreshMembers }) => {
  const [memberData, setMemberData] = useState({
    name: "",
    phone: "",
    email: "",
    educationalStatus: "",
    educationalBackground: "",
    cityOfOrigin: "",
    cityOfResidence: "",
    areaOfResidence: "",
    dateOfBirth: "", // Initialize as empty string
    member_of: [], // This should be an array of group IDs
  });

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`${API_ENDPOINTS.MEMBERS}/${id}`);
        console.log("Fetched member data:", response.data); // Log fetched member data

        // Set member data and format member_of to only include IDs
        setMemberData({
          ...response.data,
          dateOfBirth: response.data.dateOfBirth
            ? response.data.dateOfBirth.split("T")[0]
            : "", // Handle potential null
          member_of: response.data.member_of.map((group) => group._id), // Extract only IDs for member_of
        });

        // Fetch groups for multi-select
        const groupResponse = await axios.get(API_ENDPOINTS.GROUPS);
        console.log("Fetched groups:", groupResponse.data); // Log fetched groups
        setGroups(
          groupResponse.data.map((group) => ({
            value: group._id,
            label: group.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching member data:", error);
        toast.error("Error fetching member data"); // Show error notification
      } finally {
        setLoading(false); // End loading
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  const handleChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : []; // Store only IDs
    setMemberData({ ...memberData, member_of: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await axios.patch(`${API_ENDPOINTS.MEMBERS}/${id}`, memberData);
      toast.success("Member updated successfully"); // Show success notification
      refreshMembers(); // Refresh members list after successful update
      onClose(); // Close modal after update
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error("Error updating member"); // Show error notification
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "600px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Member
        </Typography>
        {loading && <p>Loading...</p>} {/* Show loading message */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Name"
            value={memberData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            name="phone"
            label="Phone"
            value={memberData.phone}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            value={memberData.email}
            onChange={handleChange}
          />

          {/* Multi-Select for Groups */}
          <Select
            isMulti
            options={groups}
            value={groups.filter((group) =>
              memberData.member_of.includes(group.value)
            )}
            onChange={handleSelectChange}
            placeholder="Select Groups"
          />

          <TextField
            fullWidth
            margin="normal"
            name="educationalStatus"
            label="Educational Status"
            value={memberData.educationalStatus}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            name="educationalBackground"
            label="Educational Background"
            value={memberData.educationalBackground}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            name="cityOfOrigin"
            label="City of Origin"
            value={memberData.cityOfOrigin}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            name="cityOfResidence"
            label="City of Residence"
            value={memberData.cityOfResidence}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            name="areaOfResidence"
            label="Area of Residence"
            value={memberData.areaOfResidence}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            type="date"
            name="dateOfBirth"
            label="Date of Birth"
            InputLabelProps={{ shrink: true }}
            value={memberData.dateOfBirth || ""}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Update Member
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditMember;
