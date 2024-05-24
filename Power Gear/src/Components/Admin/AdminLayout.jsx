import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const cardStyle = {
    maxWidth: 1800,
    margin: 'auto',
    marginTop: '100px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor:'#e0e1dd'

  };

  const buttonStyle = {
    marginRight: '10px',
    backgroundColor: '#ffb703',
    color: 'black',
    border:'solid',
    borderColor:'black'
  };

  return (
    <div>
      <Box sx={cardStyle}>
        <Card>
          <CardContent>
            <Typography variant="h1" component="h2" gutterBottom>
              Dashboard
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/admin/products"
              sx={buttonStyle}
            >
              Products
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/admin/users"
              sx={buttonStyle}
            >
              Users
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/admin/orders"
              sx={buttonStyle}
            >
              Orders
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default AdminDashboard;
