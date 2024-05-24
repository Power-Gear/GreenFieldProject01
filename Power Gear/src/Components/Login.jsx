import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Navbar from './Navbarr';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    backgroundImage: (props) => `url(${props.background})`,
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
});

const Login = ({ changeView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();
    const classes = useStyles({ background: 'decoded_base64_image_here' })

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/User/log', { email, password });
            alert('Login successful!');
            console.log(response);
            navigate('/')
            localStorage.setItem('User', JSON.stringify(response.data.user))            
            
        } catch (error) {
            setError('Login failed! ');
        }
    };

    const handleSignUp = () => {
        navigate('/SignUp');
    };

    return (
        <div>
            <Navbar />
        <Container component="main" maxWidth="xs" className={classes.root}>
            <Box className={classes.formContainer} >
                <Typography component="h1" variant="h5" align="center" onClick={()=>{
                }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: 'Blue' }}
                       
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" align="center">
                    No account?
                    <Button onClick={handleSignUp} variant="text" color="secondary">
                        Sign Up
                    </Button>
                </Typography>
            </Box>
        </Container>
        </div>
    );
};

export default Login;