import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api";
import MemberModal from "./MemberModal"; // Assuming this is for viewing member details
import EditMember from "./EditMember"; // Import the EditMember modal
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
  Typography,
} from "@mui/material";

const MemberList = ({ members, setMembers }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
  const [currentMemberId, setCurrentMemberId] = useState(null); // State for current member ID
  const [sortOrder, setSortOrder] = useState("default"); // State for sorting order

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.MEMBERS}/${id}`);
      setMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting member");
    }
  };

  const handleShowDetails = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  const handleEditClick = (id) => {
    setCurrentMemberId(id); // Set the current member ID
    setEditModalOpen(true); // Open the edit modal
  };

  // Function to sort members based on the selected order
  const sortedMembers = () => {
    if (sortOrder === "asc") {
      return [...members].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      return [...members].sort((a, b) => b.name.localeCompare(a.name));
    }
    return members; // Default order
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Member List
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setSortOrder("asc")}
          sx={{ mr: 1 }}
        >
          Sort Ascending
        </Button>
        <Button
          variant="outlined"
          onClick={() => setSortOrder("desc")}
          sx={{ mr: 1 }}
        >
          Sort Descending
        </Button>
        <Button variant="outlined" onClick={() => setSortOrder("default")}>
          Reset Sort
        </Button>
      </Box>

      <List>
        {sortedMembers().map((member) => (
          <Box
            key={member._id}
            sx={{ border: "1px solid #ccc", borderRadius: "4px", mb: 1 }}
          >
            <ListItem>
              <ListItemText
                primary={member.name}
                secondary={
                  <a
                    href={`tel:${member.phone}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Phone: {member.phone}
                  </a>
                }
              />
              <ListItemSecondaryAction>
                <Button
                  onClick={() => handleEditClick(member._id)} // Open edit modal on click
                  variant="outlined"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(member._id)}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleShowDetails(member)}
                  variant="outlined"
                  color="info"
                >
                  Show Details
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </Box>
        ))}
      </List>

      {/* Modal for displaying member details */}
      {showModal && selectedMember && (
        <MemberModal member={selectedMember} onClose={handleCloseModal} />
      )}

      {/* Edit Member Modal */}
      {editModalOpen && (
        <EditMember
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          id={currentMemberId}
          refreshMembers={async () => {
            try {
              const response = await axios.get(API_ENDPOINTS.MEMBERS);
              setMembers(response.data); // Refresh the members list after editing.
            } catch (error) {
              console.error("Error fetching members:", error);
              alert("Error fetching members");
            }
          }}
        />
      )}
    </>
  );
};

export default MemberList;
