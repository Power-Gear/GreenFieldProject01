import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; 
import AdminLayout from "./AdminLayout";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    id: "",
    customerName: "",
    products: [],
    totalAmount: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchOrdersByUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Admin/orders/user/${userId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/Admin/orders/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setCurrentOrder({
      id: "",
      customerName: "",
      products: [],
      totalAmount: "",
      status: "",
      date: "",
    });
  };

  return (
    <div>
      <AdminLayout />
      <Typography
        variant="h3"
        gutterBottom
        style={{
          textAlign: "center",
          backgroundColor: "#FFB703",
          color: "#e0e1dd",
        }}
      >
        Orders
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {orders.map((order) => (
  <TableRow key={order.id}>
    <TableCell>{order.customerName || "Unknown Customer"}</TableCell>
    <TableCell>{Array.isArray(order.products) ? order.products.join(", ") : ''}</TableCell>
    <TableCell>{order.totalAmount}</TableCell>
    <TableCell>{order.status}</TableCell>
    <TableCell>{order.date}</TableCell>
    <TableCell>
    
      <IconButton
        aria-label="delete"
        onClick={() => deleteOrder(order.id)}
      >
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
))}


          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={viewDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>View Order</DialogTitle>
        <DialogContent>
          <DialogContentText>Details of the selected order.</DialogContentText>
          <Typography>Name: {currentOrder.customerName}</Typography>
          <Typography>Products: {currentOrder.products.join(", ")}</Typography>
          <Typography>Total Amount: {currentOrder.totalAmount}</Typography>
          <Typography>Status: {currentOrder.status}</Typography>
          <Typography>Date: {currentOrder.date}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
