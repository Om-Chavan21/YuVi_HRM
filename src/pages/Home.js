import React from "react";
import { Button, CircularProgress, Typography, Container } from "@mui/material";
import { ToastContainer, toast } from "material-react-toastify";
import { Fade } from "react-awesome-reveal";
import "material-react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [loading, setLoading] = React.useState(true);

  // Simulate a loading process
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const notify = () => {
    toast("Option Selected!", {
      position: "bottom-center",
      autoClose: 1000,
      style: {
        backgroundColor: "#4caf50", // Green background
        color: "#fff", // White text
        fontWeight: "bold", // Bold text
        borderRadius: "8px", // Rounded corners
        padding: "16px", // Padding for better spacing
      },
      bodyStyle: {
        fontSize: "16px", // Font size for body text
      },
      progressStyle: {
        backgroundColor: "#ffeb3b", // Yellow progress bar
      },
    });
  };

  return (
    <Container className="text-center" style={{ marginTop: "50px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Fade>
          <Typography variant="h2" gutterBottom>
            Welcome to the Management System
          </Typography>
          <Typography variant="body1" gutterBottom>
            Select an option from the navigation to get started.
          </Typography>
          <Button variant="contained" color="primary" onClick={notify}>
            Get Started
          </Button>
        </Fade>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Home;
