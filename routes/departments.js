const express = require("express");
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator/check');
const departmentsController = require("../controllers/departments");
const departmentsValidator = require("../middleware/departmentsvalidator");

const router = express.Router();

router.get('/departments/:department_id',departmentsValidator.validate('department'),departmentsController.department);
router.get('/departments',departmentsController.departments);


module.exports = router;