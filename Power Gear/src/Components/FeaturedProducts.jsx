import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';


const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products from the API
    axios.get('http://localhost:5000/User/products')
      .then(response => {
        // Sort products by stock in descending order and select the top 4
        const sortedProducts = response.data.sort((a, b) => b.stock - a.stock);
        const topProducts = sortedProducts.slice(0, 4);
        setProducts(topProducts);
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div style={{ color: '#FFB703', backgroundColor: '#023047', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} handleCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FeaturedProducts;
