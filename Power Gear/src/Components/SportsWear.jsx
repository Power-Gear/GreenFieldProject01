import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ProductCard from "./ProductCard";
const SportsWear = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the products from the API
    axios
      .get("http://localhost:5000/User/products/category/Sports Wear")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
      });
  }, []);

  const handleSeeMore = () => {
    setShowAll(!showAll);
  };
  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return(
    <div
      style={{ color: "#FFB703", backgroundColor: "#023047", padding: "20px" }}
    >
      <Typography variant="h4" gutterBottom>
      Sports Wear
        <Button
          onClick={handleSeeMore}
          variant="outlined"
          color="primary"
          style={{
            float: "right",
            marginRight: "20px",
            color: "#023047",
            backgroundColor: "#FFB703",
            border: "solid",
            borderColor: "#023047",
          }}
        >
          {showAll ? <b>See Less</b> : <b>See More</b>}
        </Button>
      </Typography>
      <Grid container spacing={2}>
        {products.slice(0, showAll ? products.length : 4).map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} handleCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SportsWear;
