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

    const item_id = req.params.item_id;
    const quantity = req.body.quantity;

    CartWithProduct.findOne({where:{item_id: item_id}})
    .then(product => {

        if(!product){
            return res.status(500).json({});
        }

        product.quantity = quantity;
        product.subtotal = ""+(product.quantity * parseInt(product.price));
        product.save()
        .then(product =>{

            cart_id = product.cart_id;
            CartWithProduct.findAll({where:{cart_id: cart_id}, raw: true})
            .then(products => {
                
                return res.status(200).json(products);


            })
           

        })

    })
    .catch(err => {

        console.log(err);

    });


}

exports.empty = (req, res, next) => {
    const cart_id = req.params.cart_id;
    CartWithProduct.destroy({cart_id: cart_id})
    .then( () =>{  return res.status(200).json({})}) 
    .catch(err => {

        console.log(err);

    });

}

exports.removeProduct = (req, res, next) => {

    const item_id = req.params.item_id;
    CartWithProduct.destroy({item_id: item_id})
    .then( () =>{  return res.status(200).json({})}) 
    .catch(err => {

        console.log(err);

    });


}
exports.totalAmount = (req,res,next) =>{

    const cart_id = req.params.cart_id;

}

exports.moveToCart = (req, res,next) =>{

    const item_id = req.params.item_id;

}

exports.saveForLater = (req,res,next) =>{

    const item_id = req.params.item_id;

}
