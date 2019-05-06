const Product = require('../models/product');
const Review = require('../models/review');
const Department = require('../models/department');
const Category = require('../models/category'); 
const ProductCategories = require('../models/productcategories'); 
const Sequelize = require('sequelize'); 
const sequelize = require('../util/database');
const validationHandler = require('../util/validator');

exports.getProducts = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }


    page =  req.query.page || 1;
    limit = req.query.limit || 20;
    description_length = req.query.description_length || 200;
    limit= parseInt(limit),
    offset = (page-1)*limit;
   
    Product.findAll({ 

        offset: offset,
        limit: limit,
        attributes: [
            'product_id',
            'name',
            [sequelize.fn('LEFT', sequelize.col('description'), description_length), 'description'],
            'price',
            'discounted_price',
            'thumbnail'
        ]
     })
    .then( products =>{


        res.status(200).json(products);


    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);

    });
        
};

exports.getProduct = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }

    const product_id = req.params.productId;
    console.log('Productkey');
    console.log(product_id);

    Product.findByPk(product_id)
    .then( product =>{

        if(!product)
        {
            return res.status(200).json({error:'Product not found'});
        }

        res.status(200).json(product);
    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
        
};


exports.getReview = (req, res, next) => { 

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product=>{

        if(!product)
        {
            return res.status(200).json({error:"No product found"});

        }

        return product.getReviews();
    })
    .then( reviews=>{
        return res.status(200).json(reviews);
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);  
    });
        
};


exports.addReview = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const product_id = parseInt(req.params.productId);
    const review = req.body.review;
    const rating = req.body.rating;
    Product.findByPk(product_id)
    .then(product =>{

        if(!product)
        {
            return res.status(200).json({error:"No product found"});

        }

        return product.createReview({
          
            review: review,
            rating: rating,
            created_on: sequelize.fn('NOW')
        })
    })
    .then(result =>{

        res.status(200).json({status:"Success"})

    })
    .catch(err =>{ 
        
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);  
        
    });
   
};


exports.getProductLocations = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const product_id = req.params.product_id;
    Product.findByPk(product_id) 
    .then(product =>{

        if(!product)
        {
            res.status(200).json({error:'Product not found'});
            throw new Error('Product not found');
        }
   
        return product.getCategories()

    })
    .then(categories =>{
        return res.status(200).json(categories);
    })
    .catch(err => {
    
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
  
};

exports.getProductsInDepartment = (req, res, next) => {
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    page =  req.query.page || 1;
    limit = req.query.limit || 20;
    description_length = req.query.description_length || 200;
    limit= parseInt(limit),
    offset = (page-1)*limit;
    const department_id = req.params.department_id;
    Product.findAll({

        offset: offset,
        limit: limit,
        attributes: [
            'product_id',
            'name',
            [sequelize.fn('LEFT', sequelize.col('description'), description_length), 'description'],
            'price',
            'discounted_price',
            'thumbnail',
            "display"
        ],
        include: [
            { model: Category,
              where:{department_id:department_id},
              attributes:[]
            }
        ]
    })
    .then(products =>{

        if(!products)
        {
            res.status(200).json({error:'Products not found'});
            throw new Error('Products not found');
        }

        return res.status(200).json(products)

    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.getProductsInCategory = (req, res, next) => {
    
    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const category_id = req.params.category_id;
    page =  req.query.page || 1;
    limit = req.query.limit || 20;
    description_length = req.query.description_length || 200;
    limit= parseInt(limit),
    offset = (page-1)*limit;
    Category.findByPk(category_id) 
    .then(category =>{

        if(!category)
        {
            res.status(200).json({error:'Category not found'});
            throw new Error('Caregory not found');
        }

        return category.getProducts({

            offset: offset,
            limit: limit,
            attributes: {
                include:
                ['product_id',
                'name',
                [sequelize.fn('LEFT', sequelize.col('description'), description_length), 'description'],
                'price',
                'discounted_price',
                'thumbnail',
                "display"
                ],
                
            },
            

    })
    .then(products =>{

        product_list = [];
        products.forEach(function (product) {
        product_data = {
                  
            product_id: product.product_id,
                name: product.name,
                description: product.description,
                price: product.price,
                discounted_price: product.discounted_price,
                thumbnail: product.thumbnail,
                display: product.display,


            };
            product_list.push(product_data);
                
        });
            return res.status(200).json(product_list);
         })
       

    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

};

exports.searchProduct = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    query_string = req.query.query_string;
    page =  req.query.page || 1;
    limit = req.query.limit || 20;
    description_length = req.query.description_length || 200;
    limit= parseInt(limit),
    offset = (page-1)*limit;
    Product.findAll({
        
        where: {
            
            name: { [Sequelize.Op.like]:'%'+query_string+'%' },
        
        
        },
        offset: offset,
        limit: limit,
        attributes: [
            'product_id',
            'name',
            [sequelize.fn('LEFT', sequelize.col('description'), description_length), 'description'],
            'price',
            'discounted_price',
            'thumbnail'
        ]
     })
    .then( products =>{


        res.status(200).json(products);


    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });


}