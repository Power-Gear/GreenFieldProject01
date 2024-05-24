import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductCard = ({ product, handleCardClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event

    const user = JSON.parse(localStorage.getItem('User'));
    if (!user) {
      navigate('/login');
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate("/Cart",{ state: { from: location } })
  };

  return (
    <Card onClick={() => handleCardClick(product.id)}>
      <CardContent>
        <img
          src={product.picture}
          alt={product.name}
          style={{ width: '100%', height: 'auto' }}
        />
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: ${product.price.toFixed(2)}
        </Typography>
        <Typography
          variant="body2"
          color={product.stock > 0 ? 'green' : 'red'}
        >
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Typography>
        <Button
          variant="contained"
          size="small"
          style={{
            color: '#023047',
            backgroundColor: '#FFB703',
            border: 'solid',
            borderColor: '#023047',
          }}
          onClick={handleAddToCart}
        >
          <b> Add to Cart </b>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
