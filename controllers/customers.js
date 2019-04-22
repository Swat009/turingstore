const { validationResult } = require('express-validator/check');
const Customer = require('../models/customer'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.updateCustomer = (req, res, next) => {

    const errors = validationResult(req);
    if( !errors.isEmpty()){

        const error = new Error('Validation Failded.');

    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const customer = new Customer({

                name: name,
                email: email,
                password: hashedPw

            });
            return customer.save();
        })
        .then( result => {

            res.status(201).json({message: 'Customer Added to the list.!'})
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });



    
};

exports.loginCustomer = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    let loadedCustomer;
    Customer.findOne({email: email})
        .then(user => {
            if(!user){
                const error = new Error('User not found');
                error.statusCode = 401;
                throw error;
            }

            loadedCustomer = user;
            return bcrypt.compare(password, user.password);



        })
        .then(isEqual => {
            if(!isEqual){

                const error = new Error('Wrong passord');
                error.statusCode = 401;
                throw error;


            }
            const token = jwt.sign({

                    email: loadedCustomer.email,
                    userId: loadedCustomer.customer_id

                },
                'somesupersecretsecret',
                {expiresIn: '1h'}
            );
            res.status(200).json({token:token, userId: loadedCustomer.customer_id })
            



        })
        .catch(err => {

            if(!err.statusCode){

                err.statusCode = 500;
            }
            next(err);

        });

};

exports.loginFbCustomer = (req, res, next) => {

    const access_token = req.body.access_token;
    

};