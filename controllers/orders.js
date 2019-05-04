const { validationResult } = require('express-validator/check');
const { body } = require('express-validator/check');
const Cart = require('../models/cart'); 
const Order = require('../models/orders');
const Customer = require('../models/customer');


exports.createOrder = (req, res, next) => {
 
   
    const cart_id = req.body.cart_id;
    const customer_id = req.body.customer_id;
    const shipping_id = req.body.shipping_id;
    const tax_id = req.body.tax_id;
    let fetchedCart;

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

    
    

 /*    Cart.findAll({where:{cart_id:cart_id}})
    .then(cartItems=>{

        Order.


    })
 */

   
};

exports.getOrder = (req, res, next) => {

};

exports.getCustomer = (req, res, next) => {

};

exports.getShortDetail = (req, res, next) => {

};