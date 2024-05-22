const express = require('express');
const router = express.Router();
const Product = require('../database/products');
const User = require('../database/users');

//require token verification
router.get('/get', Product.getAllproducts);
router.get('/getUsers',User.getAllUsers);
router.post('/add', Product.addProduct);
router.put('/:productid', Product.modifyProduct); 
router.delete('/:productid', Product.removeProduct);
module.exports = router;