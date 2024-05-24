import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbarr'

function SignUp({ changeView }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/User/reg', { userName:username, email:email, password:password });
            console.log(response);
           alert('Sign up successful! Welcome '+ response.data.user.userName+'.');
            navigate('/Login'); 
         } catch (error) {
            if (error.response && error.response.data) {
                setError('Sign up failed: ' + error.response.data.msg);
            } else {
                setError('Sign up failed: An unexpected error occurred.',error);
                console.log(error);
            }
        }
    };
    

    return (

        <div>
        <NavBar />
        
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <Box style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', maxWidth: 400, width: '100%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {error && <Typography variant="body1" color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        style={{ marginTop: '16px' }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                </form>
            </Box>
        </Box>
        </div>
    );
}

export default SignUp;
