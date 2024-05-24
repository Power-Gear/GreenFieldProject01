import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Navbar from './Navbarr';
import cart from "../assets/Images/cart.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);
  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProceedToBuy = async () => {
    const itemId=cartItems.map((item)=>{return [item.id,item.quantity] })
    const User=JSON.parse	(localStorage.getItem('User'))
    
    const orderData = {
      
      products:JSON.stringify(itemId),
      price: '0' ,
      quantity: getTotalQuantity(),
      totalAmount: getTotalPrice(),
      status:'pending',
      userId:User.id
    };

    try {
      const response = await axios.post('http://localhost:5000/User/order', orderData);
      alert('Order placed successfully!');
      setCartItems([]);
      alert('Proceeding to buy');
      localStorage.removeItem('cartItems');
      navigate('/OrderPlaced')
    } catch (error) {
      alert('Error placing order. Please try again.');
    }
  }
  

  return (
    
    <div>
      <Navbar/>
      <Typography variant="h2" gutterBottom style={{textAlign:"center",padding:'50px',color: '#FFB703',
            backgroundColor: '#023047',margin:"1px"}}>
        Would you like to  
        <Button
          variant="contained"
          size="large"
          style={{
            color: '#FFB703',
            backgroundColor: '#023047',
            border: 'solid',
            borderColor: '#FFB703',
            
          }}
          onClick={() => navigate(-1)}
        >
         <b>continue Shopping</b> 
        </Button>
        ?
      </Typography>
      
    <div
      style={{ color: '#FFB703', backgroundColor: '#023047', padding: '20px' }}
    >
      <Typography variant="h4" gutterBottom style={{textAlign:"center"}}>
      <img src={cart} alt="Logo" style={{ height: "120px" }} />
      <br /> Your Products are just arround the corner ! 
      </Typography>
      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {item.name}
                  <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleRemoveItem(item.id)}
                  style={{
                    color: '#FFB703',
                    backgroundColor: '#6a040f',
                    border: 'solid',
                    borderColor: '#FFB703',
                    float:"right",
                    
                   
                  }}
                >
                  X
                </Button>
                <img src={item.picture} alt={item.name} style={{ width: '10%', height: 'auto',float:"right" , marginRight:"30%" ,border:"solid"}} />
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Quantity: 
                  <Button size="small" onClick={() => handleDecreaseQuantity(item.id)}>-</Button>

                  {item.quantity}                 
                   <Button size="small" onClick={() => handleIncreaseQuantity(item.id)}>+</Button>

                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price per item: ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
     
      <Typography variant="h4" style={{ margin: '20px' ,float:"right"}}>
        Total Price: ${getTotalPrice()}
      </Typography>
      <Typography variant="h4" style={{ margin: '20px',float:"right" }}>
        Total Quantity: {getTotalQuantity()}
      </Typography>
     <br />
      <Button
        variant="contained"
        size="large"
        style={{
          color: '#023047',
          backgroundColor: '#FFB703',
          border: 'solid',
          borderColor: '#023047',
          
          
        }}
        onClick={handleProceedToBuy}
      >
        Proceed to Buy
      </Button>
    </div>
    </div>

    
  );
};

export default Cart;
