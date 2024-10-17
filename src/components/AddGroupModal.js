import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { API_ENDPOINTS } from "../api";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { toast } from "material-react-toastify";

const AddGroupModal = ({ open, onClose, onSuccess }) => {
  const [groupData, setGroupData] = useState({
    name: "",
    members: [],
  });

  const [membersOptions, setMembersOptions] = useState([]);

  // Fetch members options here if necessary

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
      await axios.post(API_ENDPOINTS.GROUPS, groupData);
      onSuccess(); // Call success handler to refresh the group list
      toast.success("Group added successfully!");
      setGroupData({ name: "", members: [] }); // Reset form fields
    } catch (error) {
      console.error(error);
      toast.error("Error creating group");
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
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Group
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Group Name"
            value={groupData.name}
            onChange={handleChange}
            required
          />
          {/* Multi-Select for Members */}
          <Select
            isMulti
            options={membersOptions}
            onChange={handleSelectChange}
            placeholder="Select Members"
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
            Add Group
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddGroupModal;
