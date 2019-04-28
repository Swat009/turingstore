const Category = require('../models/category'); 
const Product = require('../models/product');
const Department = require('../models/department');


exports.categories = (req, res, next) => {

    page =  req.query.page || 1;
    limit = req.query.limit || 20;
    order = req.query.order || "name";

    console.log("Product query");
    console.log(page);
    console.log(limit);
    console.log(order);

    offset = 0;
    if(page!=1)
    {
        offset = page*limit;
    }
    console.log(offset);


    Category.findAll({
        offset: offset,
        limit: parseInt(limit),
        order: [
            [order, 'ASC'],
        ],
    })
    .then( categories =>{

        
        return res.status(200).json({ "count": categories.length,"rows":categories});


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

            categories_list = [];
            categories.forEach(function (category) {
                category_data = {
                  
                   category_id: category.category_id,
                   department_id: category.department_id,
                   name: category.name,
                };
                categories_list.push(category_data);
                
            });
            
           return res.status(200).json(categories_list);
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