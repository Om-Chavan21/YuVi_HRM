import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { API_ENDPOINTS } from "../api";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { toast } from "material-react-toastify";

const EditGroupModal = ({ open, onClose, id, refreshGroups }) => {
  const [groupData, setGroupData] = useState({
    name: "",
    members: [], // This should be an array of member objects
  });

  const [membersOptions, setMembersOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupResponse = await axios.get(`${API_ENDPOINTS.GROUPS}/${id}`);
        setGroupData(groupResponse.data);

        // Fetch members options
        const membersResponse = await axios.get(API_ENDPOINTS.MEMBERS); // Adjust this endpoint as needed
        const formattedMembers = membersResponse.data.map((member) => ({
          value: member._id,
          label: member.name, // Assuming each member has a name property
        }));

        setMembersOptions(formattedMembers);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setGroupData({ ...groupData, members: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${API_ENDPOINTS.GROUPS}/${id}`, groupData);
      toast.success("Group updated successfully");
      refreshGroups();
      onClose();
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("Error updating group");
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
          Edit Group
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
            value={membersOptions.filter((memberOption) =>
              groupData.members.some(
                (member) => member._id === memberOption.value
              )
            )}
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
            Update Group
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditGroupModal;
