const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        products: [{product_id:"Charas", name: "charas",
         description: "yo",price: "200rs", discounted_price: "200rs",thumbnail: ""}]


    });
};



exports.getReview = (req, res, next) => {

    const prodId = req.params.productId;




    res.status(200).json({
        review: "Yes you are in review.!",
        prodId: prodId

    });
};


exports.addReview = (req, res, next) => {

    console.log("id to be parse id")
    console.log(req.body);
    console.log(req.body.review);
    console.log(req.body.product_id);
    const product_id = parseInt(req.body.product_id);
    const review = req.body.review;
    const rating = req.body.rating;
    var date = new Date();
    var n = date.toDateString();

    Product.findByPk(product_id)
    .then(product =>{

        product.createReview({
            name: "Test User",
            review: review,
            rating: rating,
            created_on: n
        })
        .then(result =>{

             res.status(200).json({status:"Success"})
    
        })
        .catch(err => {
    
                res.status(400).json({
               
                err: err
        
            });
    
        });

    })
    .catch(err => console.log(err));
   
};


exports.getProductLocations = (req, res, next) => {

    const prodId = req.params.productId;


    res.status(200).json({
        review: "Yes you are in locations.!",
        prodId: prodId

    });
};