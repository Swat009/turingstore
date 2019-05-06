const Tax = require('../models/tax'); 
const validationHandler = require('../util/validator');
exports.getTaxes = (req, res, next) => {
    
    Tax.findAll()
    .then( taxes =>{

        return res.status(200).json(taxes);
    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });  

};

exports.getTax = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }

    
    const tax_id = req.params.tax_id;

    Tax.findByPk(tax_id)
    .then(tax =>{

        return res.status(200).json(tax);
    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });  


};