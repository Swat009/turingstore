const Category = require('../models/category'); 


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