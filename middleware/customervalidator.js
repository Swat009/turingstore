const { body } = require('express-validator/check');
const Customer = require('../models/customer'); 
exports.validate = (method) => {
switch (method) {
    case 'updateCustomer': {
        return [
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
        
        
        ];
    }

    case 'register': {
        return [
            body('email')
                .isEmail()
                .withMessage('USR_03,The email is invalid.')
                .custom( (value,{ req }) => {
                    return Customer.findOne({where:{email: value}}).then(userDoc => {
                        if (userDoc){
                            return Promise.reject('USR_04,The email already exists.')
                        }
                    })
                }),
            body('password','USR_11,The password is required.')
                .trim()
                .isLength({min: 5}).withMessage('USR_10, The password should be atleast of length 5.'),
            body('name','USR_02,The name is required.')
                .trim()
                .not()
                .isEmpty()
        ];
    }

    case 'putAddress': {
        return [

            body('address_1','USR_02,The address_1 is required.')
            .trim()
            .not()
            .isEmpty(),
            body('city','USR_02,The city is required.')
            .trim()
            .not()
            .isEmpty(),
            body('region','USR_02,The region is required.')
            .trim()
            .not()
            .isEmpty(),
            body('postal_code','USR_02,The postal code  is required.')
            .trim()
            .not()
            .isEmpty(),
            body('country','USR_02,The country  is required.')
            .trim()
            .not()
            .isEmpty(),
            body('shipping_region_id','USR_02,The shipping region is required.')
            .trim()
            .not()
            .isEmpty()
        
        ];
    }

    case 'putcreditCard': {
        return [

            body('credit_card','USR_02,The credit_card detail is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('credit card number must only contain digits.')
            .isLength({min: 16,max:16}).withMessage('USR_13, The credit card number should have 16 digits.'),
        
        ];
    }

    case 'loginCustomer': {
        return [

            body('email')
                .isEmail()
                .withMessage('USR_03,The email is invalid.'),
            body('password','USR_02,The password is required.')
                .trim()
                .not()
                .isEmpty()
                
        ];
    }

    case 'loginFbCustomer':{

        return [

            body('access_token','USR_02,The access_token is required.')
                .trim()
                .not()
                .isEmpty()
                
        ];

    }


  
}}