import React from "react";
import { Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import Navbar from "./Navbarr";
function AboutUs() {
  return (
    <div style={{ color: "#FFB703", backgroundColor: "#023047" }}>
      <Navbar />
      <Typography variant="h2" gutterBottom style={{ marginLeft: "50px" ,marginTop:"50px"}}>
        About Us
      </Typography>
      
          <Typography style={{ color: "#e0e1dd", marginLeft: "50px" ,paddingBottom:"50px"}}>
          <h1>Power Gear: Fueling Your Potential</h1>
  <h2>Our Story</h2>
  <ul>
    <li>Born from the raw power of athletes pushing their limits.</li>
    <li>Built to empower athletes to conquer their goals.</li>
  </ul>
  <h2>Our Mission</h2>
  <ul>
    <li>Unleash the full potential within every athlete.</li>
    <li>Design and deliver innovative, high-performance sports gear and wear.</li>
    <li>Fuel your training, maximize power, and propel you to personal bests.</li>
  </ul>
  <h2>Our Values</h2>
  <ul>
    <li>**Unleashing Innovation:** Relentless pursuit of progress for lighter, stronger, and more responsive gear.</li>
    <li>**Power Through Performance:** Uncompromising quality built to endure demanding workouts and weather conditions.</li>
    <li>**Empowering All Athletes:** High-performance equipment for everyone, regardless of age, skill, or background.</li>
    <li>**Sustainable Focus:** Committed to minimizing environmental impact through recycled materials and eco-conscious processes.</li>
    <li>**Building the Community:** Standing with athletes of all levels and partnering with organizations promoting health and sports.</li>
  </ul>
  <p>Power Gear is more than a brand; it's your partner in performance. We are here to fuel your potential, to help you unleash your inner power, and to be there with you every step of the way. Join the movement, and together, let's rewrite your limits.</p>
          </Typography>
        
      
    </div>
  );
}

export default AboutUs;
