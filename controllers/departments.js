const { body } = require('express-validator/check');
const Departments = require('../models/department'); 
const validationHandler = require('../util/validator');


exports.departments = (req, res, next) => {


    Departments.findAll()
    .then( departments =>{

        console.log(departments);

        return res.status(200).json(departments);


    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
        
}


exports.department = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }


    const department_id = req.params.department_id;


    Departments.findByPk(department_id)
    .then(department => {

        if(!department)
        {
            res.status(500).json({error:' not found'});
            throw new Error('not found');
        }
        
        return res.status(200).json(department)


    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });


}