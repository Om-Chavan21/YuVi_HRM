import React, { useState, useEffect } from "react";
import axios from "axios";
import GroupList from "../components/GroupList";
import { API_ENDPOINTS } from "../api";
import { Container, Typography, Button } from "@mui/material";
import { ToastContainer, toast } from "material-react-toastify";
import AddGroupModal from "../components/AddGroupModal"; // Import the new modal component

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchGroups(); // Fetch groups on component mount
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GROUPS);
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("Error fetching groups");
    }
  };

  const handleAddGroupSuccess = () => {
    toast.success("Group added successfully!");
    fetchGroups(); // Refresh group list after adding a new group
    setOpenModal(false); // Close modal
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Groups
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Add New Group
      </Button>
      <GroupList groups={groups} setGroups={setGroups} />
      <AddGroupModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleAddGroupSuccess} // Pass success handler to modal
      />
      <ToastContainer />
    </Container>
  );
};

export default Groups;
