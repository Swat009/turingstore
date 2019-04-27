const express = require("express");
const { body } = require('express-validator/check');
const customersController = require("../controllers/customers");
const Customer = require('../models/customer'); 
const passport = require('passport');

const router = express.Router();
router.put('/customer',[
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom( (value,{ req }) => {
            return Customer.findOne({email: value}).then(userDoc => {
                if (userDoc){
                    return Promise.reject('E-mail address already exists!')
                }
            })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5}),
    body('name')
        .trim()
        .not()
        .isEmpty()
],
customersController.updateCustomer);
router.post('/customer/login',customersController.loginCustomer);
router.post('/customers/facebook',passport.authenticate('facebook-token', { scope: ['email']}),customersController.loginFbCustomer);


module.exports = router;