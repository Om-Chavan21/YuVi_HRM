import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Fade } from "react-awesome-reveal";
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon for mobile menu

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fade>
      <AppBar position="static" sx={{ backgroundColor: "#0056b3" }}>
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "#ffffff",
                "&:hover": {
                  color: "#f8f9fa",
                },
              }}
            >
              Management System
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMenuClick}
                  edge="end"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={Link}
                    to="/members"
                    onClick={handleMenuClose}
                  >
                    Members
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/groups"
                    onClick={handleMenuClose}
                  >
                    Groups
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/events"
                    onClick={handleMenuClose}
                  >
                    Events
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div style={{ display: "flex", gap: "20px" }}>
                {["Members", "Groups", "Events"].map((text, index) => (
                  <Button
                    key={index}
                    color="inherit"
                    component={Link}
                    to={`/${text.toLowerCase()}`}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#007bff",
                        transform: "scale(1.05)",
                        transition:
                          "transform 0.3s ease, background-color 0.3s ease",
                      },
                    }}
                  >
                    {text}
                  </Button>
                ))}
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Fade>
  );
};

export default Navbar;
