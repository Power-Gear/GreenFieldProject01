import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Avatar, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
 const navigate=useNavigate()
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } 
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("User");
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={5}
      >
        <Avatar
          src={user.profilePicture}
          alt={user.name}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          {user.userName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {user.email}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
