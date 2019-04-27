const { body } = require('express-validator/check');
const Departments = require('../models/department'); 

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


    const department_id = req.params.department_id;


    Departments.findOne({department_id: department_id, raw: true})
    .then(department => {
        
        return res.status(200).json(department)


    })
    .catch(err => {

        console.log(err);

    });


}