var uniqid = require('uniqid');
const Cart = require('../models/cart'); 
const CartWithProduct = require('../models/cartwithproduct'); 



exports.generateUniqueId = (req, res, next) => {

    cart_id = uniqid();
    res.status(200).json({cart_id: cart_id});

}

exports.add = (req, res, next) => {
    
    const cart_id = req.params.cart_id;
    const product_id = req.params.product_id;
    const attributes = req.params.attributes;

    const cartwithproduct = new CartWithProduct({

        cart_id: cart_id,
        product_id: product_id,
        attributes: attributes

      });

    cartwithproduct.save().then(cartwithproduct =>{

        res.status(200).json(JSON.stringify(cartwithproduct));
         
    })
    .catch(err => {

          return done(err);
      
    });


}


exports.getcartId = (req, res, next) => {


    const cart_id = req.params.cart_id;


    CartWithProduct.findAll({where:{cart_id: cart_id}, raw: true})
    .then(products => {
        
        return res.status(200).json(products);


    })
    .catch(err => {

        console.log(err);

    });


} 


exports.update = (req, res, next) => {



}

