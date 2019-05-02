const express = require("express");
const { body } = require('express-validator/check');

const ordersController = require("../controllers/orders");

const router = express.Router();
router.post('/orders',ordersController.validate('createOrder'),ordersController.createOrder);
router.post('/orders/:order_id',ordersController.validate('getOrder'),ordersController.getOrder);
router.post('/orders/inCustomer',ordersController.validate('getCustomer'),ordersController.getCustomer);
router.post('/orders/shortDetail/:order_id',ordersController.validate('getShortDetail'),ordersController.getShortDetail);



module.exports = router;