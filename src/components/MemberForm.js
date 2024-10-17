import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { API_ENDPOINTS } from "../api";
import { TextField, Button, Box, Typography, Modal } from "@mui/material";
import { toast } from "material-react-toastify"; // Import toast for notifications

const MemberForm = ({ open, onClose, onSuccess }) => {
  const [memberData, setMemberData] = useState({
    name: "",
    phone: "",
    email: "",
    educationalStatus: "",
    educationalBackground: "",
    cityOfOrigin: "",
    cityOfResidence: "",
    areaOfResidence: "",
    dateOfBirth: "", // Date of birth is optional
    member_of: [],
  });

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get(API_ENDPOINTS.GROUPS);
      setGroups(
        response.data.map((group) => ({ value: group._id, label: group.name }))
      );
    };

    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setMemberData({ ...memberData, member_of: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!memberData.phone) {
      toast.error("Phone number is required");
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.MEMBERS, memberData);
      onSuccess(); // Call success handler to refresh the member list
      toast.success("Member added successfully!");
      setMemberData({
        name: "",
        phone: "",
        email: "",
        educationalStatus: "",
        educationalBackground: "",
        cityOfOrigin: "",
        cityOfResidence: "",
        areaOfResidence: "",
        dateOfBirth: "", // Reset date of birth
        member_of: [],
      });
    } catch (error) {
      console.error(error);
      // Display error message from the response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error creating member");
      }
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
          maxHeight: "80%", // Set maximum height for scrolling
          overflowY: "auto", // Enable vertical scrolling
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          "&::-webkit-scrollbar": {
            // Custom scrollbar styles
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Member
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
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

          {/* Date of Birth is now optional */}
          <TextField
            fullWidth
            margin="normal"
            type="date"
            name="dateOfBirth"
            label="Date of Birth"
            InputLabelProps={{
              shrink: true,
            }}
            value={memberData.dateOfBirth}
            onChange={handleChange} // No required attribute here
          />

          {/* Multi-Select for Groups */}
          <Select
            isMulti
            options={groups}
            onChange={handleSelectChange}
            placeholder="Select Groups"
            styles={{
              control: (provided) => ({
                ...provided,
                marginTop: "16px",
              }),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Member
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MemberForm;
