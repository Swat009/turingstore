var uniqid = require('uniqid');
const Cart = require('../models/cart'); 
const Product = require('../models/product');


exports.generateUniqueId = (req, res, next) => {

    cart_id = uniqid();
    res.status(200).json({cart_id: cart_id});

}

exports.add = (req, res, next) => {
    
    const cart_id = req.body.cart_id;
    const product_id = req.body.product_id;
    const attributes = req.body.attributes;
    const item_id = cart_id+product_id;

    Product.findByPk(product_id)
    .then(product =>{
        console.log("Product");
        console.log(product);
        const cart = new Cart({

            cart_id: cart_id,
            product_id: product_id,
            attributes: attributes,
            item_id: item_id,
            quantity: 1,        
    
        });
    
        return cart.save()
    
    })
    .then(cart => {

        return Cart.findAll({
            
            where:{cart_id: cart.cart_id},
            attributes: [
                "item_id",
                "name",
                "attributes",
                "quantity",
            ],
            include: [
                { 
                    model: Product,   
                    attributes:["price"]
                }
            ]
        
        });
         
    })
    .then( cartitems =>{

        res.status(200).json(cartitems);

    })
    .catch(err => {

        console.log(err);
        return res.status(500).json({error:err});
      
    });


}


exports.getcartId = (req, res, next) => {


    const cart_id = req.params.cart_id;


    Cart.findAll({
        where:{cart_id: cart_id},
        attributes: [
            "item_id",
            "name",
            "attributes",
            "price",
            "quantity",
            "subtotal"
        ]
    })
    .then(cartproducts => {
        
        return res.status(200).json(cartproducts);


    })
    .catch(err => {

        console.log(err);

    });


} 


exports.update = (req, res, next) => {

    const item_id = req.params.item_id;
    const quantity = req.body.quantity;

    Cart.findOne({where:{item_id: item_id},})
    .then(cartItem => {

        if(!cartItem){
            return res.status(500).json({});
        }

        cartItem.quantity = quantity;
        cartItem.subtotal = ""+(cartItem.quantity * parseInt(cartItem.price));
        return cartItem.save()
        
    })
    .then(cartItem =>{

        cart_id = cartItem.cart_id;
        return Cart.findAll({
            where:{cart_id: cart_id},
            attributes: [
                "item_id",
                "name",
                "attributes",
                "price",
                "quantity",
                "subtotal"
            ]
        
        })

    })
    .then(cartItems => {
            
        return res.status(200).json(cartItems);


    })
    .catch(err => {

        console.log(err);

    });


}

exports.empty = (req, res, next) => {
    const cart_id = req.params.cart_id;
    Cart.destroy({where:{cart_id: cart_id}})
    .then( () =>{  return res.status(200).json({})}) 
    .catch(err => {

        console.log(err);

    });

}

exports.removeProduct = (req, res, next) => {

    const item_id = req.params.item_id;
    Cart.destroy({where:{item_id: item_id}})
    .then( () =>{  return res.status(200).json({})}) 
    .catch(err => {

        console.log(err);

    });


}
exports.totalAmount = (req,res,next) =>{

    const cart_id = req.params.cart_id;
    Cart.findAll({where:{cart_id: cart_id}})
    .then(cartproducts => {

        totalAmount = 0.00;
        cartproducts.forEach(function (cartproduct) {
            totalAmount += parseFloat(cartproduct.subtotal);
        });

        console.log('TotalAmount'+totalAmount);
        
        return res.status(200).json({"total_amount":totalAmount});


    })
    .catch(err => {

        console.log(err);

    });

}

exports.moveToCart = (req, res,next) =>{

    const item_id = req.params.item_id;

}

exports.saveForLater = (req,res,next) =>{

    const item_id = req.params.item_id;

}
