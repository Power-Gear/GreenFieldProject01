import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Button } from '@mui/material';
import Navbar from './Navbarr';

const ProductDetails = () => {
  const { productId} = useParams(); 
  console.log(productId);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details from the API using the product ID
    axios.get(`http://localhost:5000/User/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching the product details:', error);
      });
  }, [productId]);
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
    <Card style={{ maxWidth: 600, margin: '20px auto', padding: '20px' ,textAlign:"center"}}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <img src={product.picture} alt={product.name} style={{ width: '100%', height: 'auto' }} />
        <Typography variant="h6" gutterBottom>
          Price: ${product.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {product.description}
        </Typography>
        <Typography variant="body2" color={product.stock > 0 ? 'green' : 'red'}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Typography>
        <Button variant="contained" size="small" style={{ color: '#023047', backgroundColor: '#FFB703'  ,border:"solid",borderColor:'#023047'}} onClick={handleAddToCart}>
           <b> Add to Cart </b>
          </Button>
      </CardContent>
    </Card>
    </div>
    
  );
};

export default ProductDetails;
