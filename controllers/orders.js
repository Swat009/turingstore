const { validationResult } = require('express-validator/check');
const { body } = require('express-validator/check');
const Cart = require('../models/cart'); 
const Order = require('../models/orders');
const Tax = require('../models/tax');
const Customer = require('../models/customer');
const validationHandler = require('../util/validator');
const Shipping = require('../models/shipping');
const sequelize = require('../util/database');


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

    let currentOrder;
    let totalAmount = 0.0;
    let taxPercentage = 0.0;
    let shippingCost = 0.0;

    Tax.findByPk(tax_id)
    .then(tax=>{

        taxPercentage = tax.tax_percentage;

    })
    .then(()=>{

        return Shipping.findByPk(shipping_id);
    })
    .then(shipping =>{

        shippingCost = shipping.shipping_cost;
    })
    .then(()=>{

        return Cart.findByPk(cart_id);

    })
    .then(cart =>{
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products =>{

        return Customer.findByPk(customer_id)
        .then(customer =>{

            return customer.createOrder({
                cart_id: cart_id,
                shipping_id: shipping_id,
                tax_id: tax_id,
                created_on: sequelize.fn('NOW')
            });
        } )
        .then(order =>{

            currentOrder = order;

            return order.addProduct(products.map(product =>{

                product.orderdetail = {
                    quantity: product.cartitem.quantity,
                    product_name: product.name,
                    unit_cost: product.price,
                    item_id:product.cartitem.item_id,
                    attributes:product.cartitem.attributes,

                };
                totalAmount += (parseFloat(product.price)*parseInt(product.cartitem.quantity));
                return product;

            }));

        })
        .catch(err => {

           console.log(err);

            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });


    })
    .then(()=>{

        console.log('order is');
        //console.log(order)
        taxAmount = (parseFloat(totalAmount)*parseFloat(taxPercentage))/100.0;
        finalCost = parseFloat(totalAmount)+parseFloat(shippingCost)+parseFloat(taxAmount)
        console.log(taxAmount);
        console.log(totalAmount);
        console.log(finalCost);
        currentOrder.total_amount = finalCost;
        return currentOrder.save();
       

    })
    .then(order=>{
        return res.json({orderId:order.order_id});

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

        orderdetail = {
            order_id: order.order_id,
            total_amount:order.total_amount,
            created_on: order.created_on,
            status: order.status === 0 ?"unpaid":"paid"
        }

        res.status(200).json(orderdetail);
    })
    .catch(err => {

        console.log(console.err);
        

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

};