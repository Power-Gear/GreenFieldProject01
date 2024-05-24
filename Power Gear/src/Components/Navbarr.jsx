import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import cart from "../assets/Images/cart.png";

const Navbar = () => {
 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AppBar
      position="sticky"
      style={{ color: "#023047", backgroundColor: "#778da9" }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} style={{ display: "flex" }}>
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
          <Button color="inherit" component={Link} to="/" style={{ color: "#FFB703" }}>
            <b>Power Gear</b>
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button color="inherit" component={Link} to="/Categories">
            Categories
          </Button>

          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          {user ? (
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          <Button color="inherit" component={Link} to="/Cart">
            <img
              src={cart}
              alt="cart"
              style={{ width: "50px", marginLeft: "10px" }}
            />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

