import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api";
import GroupDetailsModal from "./GroupDetailsModal"; // Import details modal
import EditGroupModal from "./EditGroupModal"; // Import edit modal
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const GroupList = ({ groups, setGroups }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);

  // State for delete confirmation dialog
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.GROUPS}/${id}`);
      setGroups((prev) => prev.filter((group) => group._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting group");
    }
    setConfirmDeleteOpen(false); // Close dialog after deletion
  };

  const handleShowDetails = (group) => {
    console.log("Before setting selected group:", selectedGroup); // Log current state
    setSelectedGroup(group);
    setShowDetailsModal(true);
  };

  const handleEditClick = (id) => {
    setCurrentGroupId(id);
    setEditModalOpen(true);
  };

  // Log selected group whenever it changes
  useEffect(() => {
    console.log("Updated Selected Group:", selectedGroup);
  }, [selectedGroup]);

  // Open delete confirmation dialog
  const openConfirmDeleteDialog = (group) => {
    setGroupToDelete(group); // Set the group to delete
    setConfirmDeleteOpen(true); // Open dialog
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Group List
      </Typography>

      <List>
        {groups.map((group) => (
          <Box
            key={group._id}
            sx={{ border: "1px solid #ccc", borderRadius: "4px", mb: 1 }}
          >
            <ListItem>
              <ListItemText
                primary={group.name}
                secondary={`Members: ${group.members.length}`}
              />
              <ListItemSecondaryAction>
                <Button
                  onClick={() => handleEditClick(group._id)}
                  variant="outlined"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => openConfirmDeleteDialog(group)} // Open confirmation dialog
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleShowDetails(group)}
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

      {/* Modal for displaying group details */}
      {showDetailsModal && selectedGroup && (
        <GroupDetailsModal
          group={selectedGroup}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {/* Edit Group Modal */}
      {editModalOpen && (
        <EditGroupModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          id={currentGroupId}
          refreshGroups={async () => {
            try {
              const response = await axios.get(API_ENDPOINTS.GROUPS);
              setGroups(response.data);
            } catch (error) {
              console.error("Error fetching groups:", error);
              alert("Error fetching groups");
            }
          }}
        />
      )}

      {/* Confirmation Dialog for Deletion */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this group?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(groupToDelete._id)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupList;
