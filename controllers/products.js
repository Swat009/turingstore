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

    console.log("Product query");
    console.log(page);
    console.log(limit);
    console.log(description_length);

    offset = 0;
    if(page!=1)
    {
        offset = page*limit;
    }
    console.log(offset);


    Product.findAll({ 
        offset: offset,
        limit: parseInt(limit),
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

        console.log(err);

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


        res.status(200).json(product);


    })
    .catch(err => {

        console.log(err);

    });
        
};


exports.getReview = (req, res, next) => {

    const prodId = req.params.productId;
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }

    Product.findOne({
        where: {product_id: prodId},
        attributes: [],
        include: [
            {
                model: Review, as: Review.tableName,

                attributes: ['name','review','rating','created_on'],
               
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

    const product_id = req.params.product_id;

    Product.findByPk(product_id) 
    .then(product =>{

        
        product.getCategories({
           
        })
        .then(categories =>{
            return res.status(200).json(categories);
        })
        

    })
    .catch(err => console.log(err));
  
};

exports.getProductsInDepartment = (req, res, next) => {

    page =  req.query.page || 1;
    limit = req.query.limit || 20;
    description_length = req.query.description_length || 200;

    console.log("Product query");
    console.log(page);
    console.log(limit);
    console.log(description_length);

    offset = 0;
    if(page!=1)
    {
        offset = page*limit;
    }
    console.log(offset);


    const department_id = req.params.department_id;

    Product.findAll({

        offset: offset,
        limit: parseInt(limit),
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
              where:{departmentDepartmentId:department_id},
              attributes:[]
            }
        ]
    })
    .then(products =>{

           return res.status(200).json(products)

    })
    .catch(err => console.log(err));

};

exports.getProductsInCategory = (req, res, next) => {


    const category_id = req.params.category_id;
    if( isNaN(num1))


    page =  req.query.page || 1;
    limit = req.query.limit || 20;
    description_length = req.query.description_length || 200;

    console.log("Product query");
    console.log(page);
    console.log(limit);
    console.log(description_length);

    offset = 0;
    if(page!=1)
    {
        offset = page*limit;
    }
    console.log(offset);


    

    Category.findByPk(category_id) 
    .then(category =>{

        return category.getProducts({

            offset: offset,
            limit: parseInt(limit),
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
            console.log('########Products are ############');
            return res.status(200).json(product_list);
         })
       

    })
    .catch(err => console.log(err));

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

    console.log("Product query");
    console.log(page);
    console.log(limit);
    console.log(description_length);

    offset = 0;
    if(page!=1)
    {
        offset = page*limit;
    }
    console.log(offset);


    Product.findAll({
        
        where: {
            
            name: { [Sequelize.Op.like]:'%'+query_string+'%' },
        
        
        },
        offset: offset,
        limit: parseInt(limit),
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

        console.log(err);

    });


}