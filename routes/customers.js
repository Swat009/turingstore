const express = require("express");
const { body } = require('express-validator/check');
const customersController = require("../controllers/customers");
const Customer = require('../models/customer'); 
const passport = require('passport');
const isAuth = require('../middleware/is-auth');
const customersValidator = require('../middleware/customervalidator');

const router = express.Router();
router.put('/customer',isAuth,customersValidator.validate('updateCustomer'), customersController.updateCustomer);
router.post('/customers',isAuth,customersValidator.validate('register'),customersController.register);
router.put('/customers/address',isAuth,customersValidator.validate('putAddress'),customersController.putAddress);
router.put('/customers/creditCard',isAuth,customersValidator.validate('putcreditCard'),customersController.putcreditCard);
router.post('/customers/login',customersValidator.validate('loginCustomer'),customersController.loginCustomer);
router.post('/customers/facebook',customersValidator.validate('loginFbCustomer'),passport.authenticate('facebook-token'),customersController.loginFbCustomer);
router.get('/customer', isAuth, customersController.getCustomer);

module.exports = router;