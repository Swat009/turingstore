const Tax = require('../models/tax'); 

exports.getTaxes = (req, res, next) => {
    
    Tax.findAll()
    .then( taxes =>{

        return res.status(200).json(taxes);
    })

};

exports.getTax = (req, res, next) => {
    
    const tax_id = req.params.tax_id;

    Tax.findByPk(tax_id)
    .then(tax =>{

        return res.status(200).json(tax);
    })


};