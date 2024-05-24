// src/components/admin/UsersPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper ,IconButton} from '@mui/material';
import AdminLayout from './AdminLayout'
import DeleteIcon from "@mui/icons-material/Delete";
const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/getUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const DeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/Admin/Users/${userId}`);
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  return (
    <div>
      <AdminLayout />
      <Typography variant="h3" gutterBottom style={{textAlign:"center", backgroundColor:"#FFB703",color:"#e0e1dd"}}>
        Users
        </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Action</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                <IconButton
                    aria-label="delete"
                    onClick={() => DeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default UsersPage;
