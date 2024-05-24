const express = require('express');
const router = express.Router();
const Product = require('../database/products');
const User = require("../database/users");
const Order = require('../database/order');


router.get('/products', Product.getAllproducts);
router.get('/products/:productId', Product.getOneProduct);
router.get('/products/category/:category',Product.getByCategory)


//JWT token 
router.post('/order',Order.addOrder)
router.get('/orderId',Order.getOrder)
router.get('/oreders',Order.getAllorders)
router.post('/add',User.addUser)
router.get('/:userid',User.getOneUser)
router.put('/:userid',User.updateUser)
router.post('/log',User.login)
router.post('/reg',User.register)
module.exports=router