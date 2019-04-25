const express = require("express");
const isAuth = require('../middleware/is-auth');
const departmentsController = require("../controllers/departments");

const router = express.Router();


router.get('/categories/inProduct/:product_id',categoriesControllerInProduct);
router.get('/categories/inDepartment/:department_id',categoriesControllerInDepartment);
router.get('/categories/:category_id',categoriesController.category_id);
router.get('/categories',categoriesController.categories);



module.exports = router;