const Product = require('../models/product');
const Review = require('../models/review');
const Department = require('../models/department');

exports.getProducts = (req, res, next) => {

    Product.findAll({raw: true})
    .then( products =>{


        res.status(200).json(products);


    })
    .catch(err => {

        console.log(err);

    });
        
};

exports.getProduct = (req, res, next) => {

    const product_id = req.params.productId;
    console.log('Productkey');
    console.log(product_id);

    Product.findByPk(product_id)
    .then( product =>{


        res.status(200).json(product);


    })
    .catch(err => {

        console.log(err);

    });
        
};




exports.getReview = (req, res, next) => {

    const prodId = req.params.productId;

    Product.findOne({
        where: {product_id: prodId},
        attributes: [],
        include: [
            {
                model: Review, as: Review.tableName,
               
            }
        ]
    })
    .then( product=>{

        //console.log(reviews);

        return res.status(200).json(product.reviews);


    })
    .catch(err => {

        console.log(err);
        return res.status(500).json(err);

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

    Product.findByPk(product_id) 
    .then(product =>{

        department_id = product.departmentDepartmentId;

        

    })
    .catch(err => console.log(err));
  
};

exports.getProductsInDepartment = (req, res, next) => {


    const department_id = parseInt(req.params.department_id);

    Product.findAll({where:{departmentDepartmentId:department_id}})
    .then(products =>{

            res.status(200).json(products)

    })
    .catch(err => console.log(err));

};