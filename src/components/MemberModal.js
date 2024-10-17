import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const MemberModal = ({ member, onClose }) => {
  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Member Details
        </Typography>
        <Typography>
          <strong>Name:</strong> {member.name}
        </Typography>
        <Typography>
          <strong>Phone:</strong> {member.phone}
        </Typography>
        <Typography>
          <strong>Email:</strong> {member.email}
        </Typography>
        <Typography>
          <strong>Educational Status:</strong> {member.educationalStatus}
        </Typography>
        <Typography>
          <strong>Educational Background:</strong>{" "}
          {member.educationalBackground}
        </Typography>
        <Typography>
          <strong>City of Origin:</strong> {member.cityOfOrigin}
        </Typography>
        <Typography>
          <strong>City of Residence:</strong> {member.cityOfResidence}
        </Typography>
        <Typography>
          <strong>Area of Residence:</strong> {member.areaOfResidence}
        </Typography>
        <Typography>
          <strong>Date of Birth:</strong>{" "}
          {new Date(member.dateOfBirth).toLocaleDateString()}
        </Typography>
        <Typography>
          <strong>Groups:</strong> {member.areaOfResidence}
        </Typography>

        {/* Display Groups one below another */}
        <Box sx={{ ml: 3, mt: 0.5 }}>
          {member.member_of.length > 0 ? (
            member.member_of.map((groupName, index) => (
              <Typography key={index} sx={{ mb: 0.5 }}>
                {groupName.name} {/* Assuming groupName has a name property */}
              </Typography>
            ))
          ) : (
            <Typography>No groups assigned</Typography>
          )}
        </Box>

        {/* Close Button */}
        <Button variant="contained" color="secondary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default MemberModal;
