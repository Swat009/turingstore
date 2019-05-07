var uniqid = require('uniqid');
const Cart = require('../models/cart'); 
const Product = require('../models/product');
const sequelize = require('../util/database');
const validationHandler = require('../util/validator');


genereteResult = (products)=>{

    cart_data = []
    products.forEach(function (product) {

        cart_item_data = {

            item_id:product.cartitem.item_id,
            name:product.name,
            attributes:product.cartitem.attributes,
            price:product.price,
            quantity:product.cartitem.quantity,
            subtotal:(parseFloat(product.price)*parseInt(product.cartitem.quantity))

        }
        cart_data.push(cart_item_data);
    });

    return cart_data;
    
}

exports.generateUniqueId = (req, res, next) => {

    cart_id = uniqid();
    res.status(200).json({cart_id: cart_id});

}

exports.add = (req, res, next) => {
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const cart_id = req.body.cart_id;
    const product_id = req.body.product_id;
    const attributes = req.body.attributes;
    const item_id = cart_id+'-'+product_id;
    let fetchedCart;
    newQuantity = 1;

    Cart.findByPk(cart_id)
    .then(cart =>{

        if(!cart)
        {
            const cart = new Cart({

                cart_id: cart_id,
                
            });
        
            return cart.save()
        }
        return cart;
    })
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { product_id: product_id} });
    })
    .then(products=>{
        let product;
        if (products.length > 0) {
            product = products[0];
        }

        if (product) {
            const oldQuantity = product.cartitem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(product_id);
    })
    .then(product =>{
        console.log('Product is');
        console.log(product);
        return fetchedCart.addProduct(product, {through: { 
            quantity: newQuantity,
            item_id: item_id,
            attributes: attributes,
            added_on: sequelize.fn('NOW')

        }});
    })
    .then( cartitem =>{

        return fetchedCart.getProducts();

    })
    .then(products=>{

        return res.status(200).json(genereteResult(products));

    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

}


exports.getcartId = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const cart_id = req.params.cart_id;

    Cart.findByPk(cart_id)
    .then( cart =>{

        if(!cart)
        {
            res.status(200).json({error:'Cart not found'});
            throw new Error('Cart not found');
        }

        return cart.getProducts();
    })
    .then(products =>{
     
        return res.status(200).json(genereteResult(products));

    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);

    });
} 

exports.update = (req, res, next) => {
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const item_id = req.params.item_id;
    const item_data = item_id.split("-");
    const cart_id = item_data[0];
    const product_id = item_data[1];
    const quantity = req.body.quantity;
    let fetchedCart;
    if(isNaN(product_id))
    {
        return res.status(200).json({error:'Product id invalid'});
    }

    Cart.findByPk(cart_id)
    .then(cart =>{
        if(!cart)
        {
            res.status(200).json({error:'Cart not found'});
            throw new Error('Cart not found');
        }

        fetchedCart =cart;
        return cart.getProducts({where:{product_id:product_id}});
    })
    .then(products=>{
        let product;
        if (products.length > 0) {
            product = products[0];
        }

        if (product) {
           
            return product;
        }
        return Product.findByPk(product_id);
    })
    .then(product =>{
        
        if(!product)
        {
            res.status(200).json({error:'Product not found'});
            throw new Error('Product not found');
        }
        return fetchedCart.addProduct(product, {through: { 
            quantity: quantity,

        }});
    })
    .then( cartitem =>{

        return fetchedCart.getProducts();

    })
    .then(products=>{

        return res.status(200).json(genereteResult(products));

    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });


}

exports.empty = (req, res, next) => {
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const cart_id = req.params.cart_id;
    Cart.findByPk(cart_id)
    .then(cart =>{
        if(!cart)
        {
            res.status(200).json({error:'Cart not found'});
            throw new Error('Cart not found');
        }
        
        return cart.setProducts(null);

    })
    .then(result=>{

        return res.status(200).json({});
    }) 
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

}

exports.removeProduct = (req, res, next) => {
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const item_id = req.params.item_id;
    const item_data = item_id.split("-");
    const cart_id = item_data[0];
    const product_id = item_data[1];

    if(isNaN(product_id))
    {
        return res.status(200).json({error:'Product id invalid'});
    }
    Cart.findByPk(cart_id)
    .then( cart =>{
        if(!cart)
        {
            res.status(200).json({error:'Cart not found'});
            throw new Error('Cart not found');
        }

        return cart.getProducts({where:{product_id:product_id}});
    })
    .then(products =>{
        if(!products)
        {
            res.status(200).json({error:'Product not found'});
            throw new Error('Product not found');
        }
        const product = products[0];
        return product.cartitem.destroy();
    })
    .then( () =>{  return res.status(200).json({})}) 
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });


}
exports.totalAmount = (req,res,next) =>{
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const cart_id = req.params.cart_id;
    Cart.findByPk(cart_id)
    .then( cart =>{

        if(!cart)
        {
            res.status(500).json({error:'Cart not found'});
            throw new Error('Cart not found');
           
        }

        return cart.getProducts();
    })
    .then(products =>{

        totalAmount = 0.00;
        products.forEach(function (product) {
            totalAmount += (parseFloat(product.price)*parseInt(product.cartitem.quantity));
        });
        return res.status(200).json({"total_amount":totalAmount});
       

    })
    .catch(err => {
        next(err);
    });

}

exports.moveToCart = (req, res,next) =>{

    const item_id = req.params.item_id;

}

exports.saveForLater = (req,res,next) =>{

    const item_id = req.params.item_id;

}
