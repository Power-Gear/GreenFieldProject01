import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

function Banner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', backgroundSize: 'cover', backgroundPosition: 'center' ,color: '#023047', backgroundColor: '#e0e1dd'  }}>
      <Typography variant="h2" color="#023047"style={{margin:'50px'}} >
        Welcome to <b style={{ color: '#FFB703'}}>POWER GEAR</b> ! <br />
        free delivery across all Tunisia for carts over $199! 
      </Typography>
      <Button variant="contained" color="primary" size="large"style={{ color: '#023047', backgroundColor: '#FFB703'  ,margin:"50px",border:"solid",borderColor:'#023047'}} component={Link} to='/Categories'>
       <b>Shop Now!</b> 
      </Button>
    </Box>
  );
}

export default Banner;