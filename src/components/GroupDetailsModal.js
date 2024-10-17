import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const GroupDetailsModal = ({ group, onClose }) => {
  console.log("Group Details:", JSON.stringify(group, null, 2)); // Log for debugging

  return (
    <Modal open onClose={onClose}>
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
          Group Details
        </Typography>

        {/* Accessing properties of the group object */}
        <Typography>
          <strong>Name:</strong> {group.name}
        </Typography>
        <Typography>
          <strong>Phone:</strong> {group.phone}
        </Typography>
        <Typography>
          <strong>Email:</strong> {group.email}
        </Typography>

        {/* Displaying members with reduced spacing */}
        {group.members && group.members.length > 0 ? (
          <>
            <Typography variant="subtitle1">
              <strong>Members:</strong>
            </Typography>
            <Box sx={{ ml: 3, mt: 0.5 }}>
              {" "}
              {/* Reduced margin-top */}
              {group.members.map((member) => (
                <Typography key={member._id} sx={{ mb: 0.5 }}>
                  {" "}
                  {/* Reduced margin-bottom */}
                  {member.name}{" "}
                  {/* Replace with actual member names if available */}
                </Typography>
              ))}
            </Box>
          </>
        ) : (
          <Typography>No members assigned to this group.</Typography>
        )}

        {/* Close Button */}
        <Button variant="contained" color="secondary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default GroupDetailsModal;
