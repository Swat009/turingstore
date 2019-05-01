const { body } = require('express-validator/check');
const Departments = require('../models/department'); 
const validationHandler = require('../util/validator');


exports.departments = (req, res, next) => {


    Departments.findAll({raw: true})
    .then( departments =>{

        console.log(departments);

        return res.status(200).json(departments);


    })
    .catch(err => {

        console.log(err);

    });
        




}


exports.department = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }


    const department_id = req.params.department_id;


    Departments.findOne({department_id: department_id, raw: true})
    .then(department => {
        
        return res.status(200).json(department)


    })
    .catch(err => {

        console.log(err);

    });


}