const express = require("express");
const { body } = require('express-validator/check');
const customersController = require("../controllers/customers");
const Customer = require('../models/customer'); 
const passport = require('passport');
const isAuth = require('../middleware/is-auth');

const router = express.Router();
router.put('/customer',isAuth,[
    body('email')
        .isEmail()
        .withMessage('USR_03,The email is invalid.')
        .custom( (value,{ req }) => {
            return Customer.findOne({where:{email: value}}).then(userDoc => {
                if (!userDoc){
                    return Promise.reject('USR_12,The email does not exists.')
                }
            })
        }),
    body('name','USR_11,The name field should not be empty.')
        .trim()
        .not()
        .isEmpty()

   
], 
customersController.updateCustomer);
router.post('/customers',[
    body('email')
        .isEmail()
        .withMessage('USR_03,The email is invalid.')
        .custom( (value,{ req }) => {
            return Customer.findOne({where:{email: value}}).then(userDoc => {
                if (userDoc){
                    return Promise.reject('USR_04,The email already exists.')
                }
            })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5}).withMessage('USR_10', 'The password should be atleast of length 5.'),
    body('name','USR_11,The name field should not be empty.')
        .trim()
        .not()
        .isEmpty()
],
customersController.register);
router.post('/customer/login',customersController.loginCustomer);
router.post('/customers/facebook',passport.authenticate('facebook-token', { scope: ['email']}),customersController.loginFbCustomer);


module.exports = router;