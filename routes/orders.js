const express = require("express");
const { body } = require('express-validator/check');
const ordersController = require("../controllers/orders");
const ordersValidator = require("../middleware/ordersvalidator");

const router = express.Router();
router.post('/orders',ordersValidator.validate('createOrder'),ordersController.createOrder);
router.post('/orders/:order_id',ordersValidator.validate('getOrder'),ordersController.getOrder);
router.post('/orders/inCustomer',ordersController.getCustomer);
router.post('/orders/shortDetail/:order_id',ordersValidator.validate('getShortDetail'),ordersController.getShortDetail);



module.exports = router;