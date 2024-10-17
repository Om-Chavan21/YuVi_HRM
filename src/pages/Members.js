import React, { useState, useEffect } from "react";
import axios from "axios";
import MemberForm from "../components/MemberForm";
import MemberList from "../components/MemberList";
import { API_ENDPOINTS } from "../api";
import { Container, Typography, Button } from "@mui/material";
import { ToastContainer, toast } from "material-react-toastify";
import { Fade } from "react-awesome-reveal";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await axios.get(API_ENDPOINTS.MEMBERS);
      setMembers(response.data);
    };
    fetchMembers();
  }, []);

  const handleAddMemberSuccess = () => {
    toast.success("Member added successfully!");
    setOpenModal(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Members
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Add New Member
      </Button>
      <MemberList members={members} setMembers={setMembers} />
      <MemberForm
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleAddMemberSuccess}
      />
      <ToastContainer />
    </Container>
  );
};

export default Members;
