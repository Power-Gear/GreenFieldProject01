// src/components/OrderPlaced.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#023047"
      color="#FFB703"
      textAlign="center"
      p={4}
    >
      <Typography variant="h3" gutterBottom>
        Thank You for Your Order!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Your order has been placed successfully.
        You will receive a call from our team to confirm delivery date and location.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={ ()=>navigate('/')}
        sx={{ mt: 4 }}
      >
        Return Home
      </Button>
    </Box>
  );
};

export default OrderPlaced;
