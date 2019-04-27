const Category = require('../models/category'); 
const Product = require('../models/product');
const Department = require('../models/department');


exports.categories = (req, res, next) => {


    Category.findAll({raw: true})
    .then( categories =>{

       // console.log(departments);

        return res.status(200).json(categories);


    })
    .catch(err => {

        console.log(err);

    });


}


exports.category = (req, res, next) => {

    const category_id = req.params.category_id;

    Category.findOne({category_id: category_id, raw: true})
    .then(category => {
        
        return res.status(200).json(category)


    })
    .catch(err => {

        console.log(err);

    });



}

exports.getProductCategories = (req, res, next) => {

    const product_id = req.params.product_id;
    Product.findByPk(product_id) 
    .then( product =>{

        product.getCategories()
        .then(categories =>{
           return res.status(200).json(categories);
        })
    })
    .catch(err => {

        console.log(err);

    });
    
}

exports.getDepartmentCategories = (req, res, next) => {

    const department_id = req.params.department_id;
    Department.findByPk(department_id) 
    .then( department =>{

        department.getCategories()
        .then(categories =>{
           return res.status(200).json(categories);
        })
    })
    .catch(err => {

        console.log(err);

    });
    
}