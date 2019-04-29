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

    const day_phone = req.body.day_phone || '';
    const eve_phone = req.body.eve_phone || '';
    const mob_phone = req.body.mob_phone || '';

    Customer.findOne({
        where: {email: email}
    })
    .then(customer =>{

        
        customer.name = name;

        if(day_phone!== "")
        {
            customer.day_phone = day_phone;
        }

        if(eve_phone!== "")
        {
            customer.eve_phone = eve_phone;
        }

        if(mob_phone!== "")
        {
            customer.mob_phone = mob_phone;
        }
        return customer.save();

    })
    .then(customer =>{

        credit_card = "";
        if(customer.credit_card && customer.credit_card.length>4)
        {
            credit_card = "XXXXXXXX"+customer.credit_card.slice(-4);
        }

        customer_data = {

            'customer_id':customer.customer_id,
            'name': customer.name,
            'email': customer.email,
            'address_1': customer.address_1,
            'address_2': customer.address_2,
            'city': customer.city,
            'region': customer.region,
            'postal_code': customer.postal_code,
            'country': customer.country,
            'shipping_region_id': customer.shipping_region_id,
            'day_phone': customer.day_phone,
            'eve_phone': customer.eve_phone,
            'mob_phone': customer.mob_phone,
            "credit_card": credit_card

        }

        res.status(201).json(customer_data)

    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
    
};

exports.register = (req, res, next) =>{

   

    const errors = validationResult(req);
    if( !errors.isEmpty()){

        console.log(errors.array());

        error = errors.array()[0];
        error_data = error.msg.split(",");
        return res.status(500).json({
            error:{
                status:400,
                code: error_data[0],
                message: error_data[1],
                field: error.param
            }
        });

    }

    //const email = req.body.email;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const customer = new Customer({

                name: name,
                email: email,
                password: hashedPw,
             
            });
            return customer.save();
        })
        .then( customer => {


            const token = jwt.sign({

                    email: customer.email,
                    userId: customer.customer_id

                },
                process.env.JWTSECRETKEY,
                {expiresIn: '24h'}
            );
        
            customer_data = {

                'customer_id':customer.customer_id,
                'name': customer.name,
                'email': customer.email,
                'address_1': customer.address_1,
                'address_2': customer.address_2,
                'city': customer.city,
                'region': customer.region,
                'postal_code': customer.postal_code,
                'country': customer.country,
                'shipping_region_id': customer.shipping_region_id,
                'day_phone': customer.day_phone,
                'eve_phone': customer.eve_phone,
                'mob_phone': customer.mob_phone,
                "credit_card": customer.credit_card

            }

            return res.status(200).json({customer: customer_data,token:token,expires_in: '24h'});

        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });



}

exports.loginCustomer = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    let loadedCustomer;
    Customer.findOne({where: {email: email}})
        .then(user => {
            if(!user){
                return res.status(401).json({
                    "code": "AUT_02",
                    "message": "No user found.",
                    "field": "API-KEY"}
                );
            }

            loadedCustomer = user;
            console.log('Customer'+user.customer_id);
            console.log('my password'+password);
            console.log('user passord'+user.password);
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if(!isEqual){

                return res.status(401).json({
                    "code": "AUT_02",
                    "message": "Invalid Password.",
                    "field": "API-KEY"}
                );

            }
            const token = jwt.sign({

                    email: loadedCustomer.email,
                    userId: loadedCustomer.customer_id

                },
                process.env.JWTSECRETKEY,
                {expiresIn: '24h'}
            );


            credit_card = "";
            if(loadedCustomer.credit_card && loadedCustomer.credit_card.length>4)
            {
                credit_card = "XXXXXXXX"+loadedCustomer.credit_card.slice(-4);
            }



            customer_data = {

                'customer_id': loadedCustomer.customer_id,
                'name': loadedCustomer.name,
                'email': loadedCustomer.email,
                'address_1': loadedCustomer.address_1,
                'address_2': loadedCustomer.address_2,
                'city': loadedCustomer.city,
                'region': loadedCustomer.region,
                'postal_code': loadedCustomer.postal_code,
                'country': loadedCustomer.country,
                'shipping_region_id': loadedCustomer.shipping_region_id,
                'day_phone': loadedCustomer.day_phone,
                'eve_phone': loadedCustomer.eve_phone,
                'mob_phone': loadedCustomer.mob_phone,
                "credit_card": credit_card

            }

            return res.status(200).json({customer: customer_data,token:token,expires_in: '24h'});
            

        })
        .catch(err => {

            if(!err.statusCode){

                err.statusCode = 500;
            }
            next(err);

        });

};

exports.loginFbCustomer = (req, res, next) => {

    
        console.log('user details');
        console.log(req.user);
        loadedCustomer = req.user
        const token = jwt.sign({

            email: loadedCustomer.email,
            userId: loadedCustomer.customer_id

        },
        process.env.JWTSECRETKEY,
        {expiresIn: '24h'}
        );


        credit_card = "";
        if(loadedCustomer.credit_card && loadedCustomer.credit_card.length>4)
        {
            credit_card = "XXXXXXXX"+loadedCustomer.credit_card.slice(-4);
        }



        customer_data = {

            'customer_id': loadedCustomer.customer_id,
            'name': loadedCustomer.name,
            'email': loadedCustomer.email,
            'address_1': loadedCustomer.address_1,
            'address_2': loadedCustomer.address_2,
            'city': loadedCustomer.city,
            'region': loadedCustomer.region,
            'postal_code': loadedCustomer.postal_code,
            'country': loadedCustomer.country,
            'shipping_region_id': loadedCustomer.shipping_region_id,
            'day_phone': loadedCustomer.day_phone,
            'eve_phone': loadedCustomer.eve_phone,
            'mob_phone': loadedCustomer.mob_phone,
            "credit_card": credit_card

        }

        return res.status(200).json({customer: customer_data,token:token,expires_in: '24h'});
        //return res.status(200).json({token:token, userId: loadedCustomer.customer_id })


};

