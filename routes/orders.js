const express = require("express");
const { body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth');
const ordersController = require("../controllers/orders");
const ordersValidator = require("../middleware/ordersvalidator");

const router = express.Router();
router.get('/orders/shortDetail/:order_id',ordersValidator.validate('getShortDetail'),ordersController.getShortDetail);
router.get('/orders/inCustomer',isAuth,ordersController.getCustomer);
router.get('/orders/:order_id',ordersValidator.validate('getOrder'),ordersController.getOrder);
router.post('/orders',ordersValidator.validate('createOrder'),ordersController.createOrder);



module.exports = router;