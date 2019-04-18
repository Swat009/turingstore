const express = require("express");
const { body } = require('express-validator/check');

const ordersController = require("../controllers/orders");

const router = express.Router();


router.post('/orders',ordersController.validate('order'),ordersController.createOrder);

module.exports = router;