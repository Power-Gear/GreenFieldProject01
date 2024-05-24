import React from "react";
import Navbar from "./Navbarr";
import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import AboutUs from "./About";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="App">
      <Navbar  />
      <Banner />
      <FeaturedProducts />
      
      <div  style={{
            color: "#ffb703",
            backgroundColor: "#e0e1dd",
            textAlign:'center'
          }}>
        <Typography
          variant="h2"
          gutterBottom
          component={Link}
          to="/about"
          style={{
            color: "#023047",
            backgroundColor: "#e0e1dd",
            
            textDecoration: 'none',
            
          }}
        >
          <br />
        <b>About Us</b>  
        </Typography>
        <Typography
           style={{
            color: "#023047",
            backgroundColor: "#e0e1dd",
            marginLeft: "50px",
            textDecoration: 'none',
            paddingBottom:"50px"
          }}
          component={Link}
          to="/about"
        >
          
            <h1>Power Gear: Fueling Your Potential</h1>
          
          <br />
        </Typography>
      </div>
    </div>
  );
}

export default Home;
