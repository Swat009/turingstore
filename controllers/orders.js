const { validationResult } = require('express-validator/check');
const { body } = require('express-validator/check');
const Cart = require('../models/cart'); 
const Order = require('../models/orders');
const Customer = require('../models/customer');
const validationHandler = require('../util/validator');


exports.createOrder = (req, res, next) => {
    
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const cart_id = req.body.cart_id;
    const customer_id = req.body.customer_id;
    const shipping_id = req.body.shipping_id;
    const tax_id = req.body.tax_id;
    

    Cart.findByPk(cart_id)
    .then(cart =>{
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products =>{

        return Customer.findByPk(customer_id)
        .then(customer =>{

            return customer.createOrder({
                cart_id:cart_id,
                shipping_id:shipping_id,
                tax_id:tax_id
            });
        } )
        .then(order =>{

            return order.addProduct(products.map(product =>{

                product.orderdetail = {
                    quantity: product.cartitem.quantity,
                    product_name: product.name,
                    unit_cost: product.price,
                    item_id:product.cartitem.item_id,
                    attributes:product.attributes,
                };
                return product;

            }));

        })
        .catch(err => {

            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });


    })
    .then(order=>{

        console.log('order is');
        console.log(order)
        return res.json({orderId:order[0].orderOrderId});

    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
   
};

exports.getOrder = (req, res, next) => {
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const order_id = req.params.order_id;
    Order.findByPk(order_id)
    .then(order =>{

        return order.getProducts();
    })
    .then(products=>{
        cart_data = [];
        products.forEach(function (product) {
                 cart_item_data = {
     
                     order_id:order_id,
                     item_id:product.orderdetail.item_id,
                     product_id:product.product_id,
                     product_name:product.name,
                     attributes:product.orderdetail.attributes,
                     quantity:product.orderdetail.quantity,
                     unit_cost:product.price,
                     subtotal:(parseFloat(product.price)*parseInt(product.orderdetail.quantity))
     
                 }
             cart_data.push(cart_item_data);
         });

        return res.status(200).json(cart_data);

    })
    .catch(err => {

        console.log(console.err);
        

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.getCustomer = (req, res, next) => {
    customer_id =  req.userId;
    console.log('User id');
    console.log(customer_id);
    Customer.findByPk(customer_id)
    .then(customer =>{

        return customer.getOrders();
    })
    .then(orders =>{

        return res.status(200).json(orders);

    })
    .catch(err => {

        console.log(console.err);
        

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });


};

exports.getShortDetail = (req, res, next) => {
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const order_id = req.params.order_id;
    let currentorder;
    Order.findByPk(order_id)
    .then(order =>{

        currentorder=order;
        return order.getProducts();
    })
    .then(products=>{
        cart_data = [];
        totalAmount = 0.0;
        products.forEach(function (product) {

            totalAmount += (parseFloat(product.price)*parseInt(product.orderdetail.quantity));
        
        });

        order_data = {
            order_id:currentorder.order_id,
            total_amount:totalAmount
        }

        return res.status(200).json(order_data);

    })
    .catch(err => {

        console.log(console.err);
        

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

};