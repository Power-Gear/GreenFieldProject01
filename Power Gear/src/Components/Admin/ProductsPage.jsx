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
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AdminLayout from "./AdminLayout";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/Admin/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/Admin/products/${currentProduct.id}`,
        currentProduct
      );
      fetchProducts();

      setEditDialogOpen(false);
      setCurrentProduct({
        id: "",
        name: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        description: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
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
        Products
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img
                    src={product.picture}
                    alt="img"
                    style={{ width: "100px" }}
                  />
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setCurrentProduct(product);
                      setEditDialogOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setCurrentProduct({
            id: "",
            name: "",
            price: "",
            image: "",
            category: "",
            stock: "",
            description: "",
          });
          setImage(null);
        }}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of the product below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={currentProduct.name}
            onChange={(e) => {
              setCurrentProduct(() => ({
                ...currentProduct,
                name: e.target.value,
              }));
            }}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={currentProduct.category}
            onChange={(e) => {
              setCurrentProduct(() => ({
                ...currentProduct,
                category: e.target.value,
              }));
            }}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={currentProduct.price}
            onChange={(e) => {
              setCurrentProduct(() => ({
                ...currentProduct,
                price: e.target.value,
              }));
            }}
          />
          <TextField
            margin="dense"
            name="stock"
            label="Stock"
            type="number"
            fullWidth
            value={currentProduct.stock}
            onChange={(e) => {
              setCurrentProduct(() => ({
                ...currentProduct,
                stock: e.target.value,
              }));
            }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={currentProduct.description}
            onChange={(e) => {
              setCurrentProduct(() => ({
                ...currentProduct,
                description: e.target.value,
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setEditDialogOpen(false);
              setCurrentProduct({
                id: "",
                name: "",
                price: "",
                image: "",
                category: "",
                stock: "",
                description: "",
              });
              setImage(null);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={updateProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
