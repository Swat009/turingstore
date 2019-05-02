const express = require("express");
const isAuth = require('../middleware/is-auth');
const categoriesController = require("../controllers/categories");
const categoriesValidator = require("../middleware/categoriesvalidator");

const router = express.Router();


router.get('/categories/inProduct/:product_id',categoriesValidator.validate('getProductCategories'),categoriesController.getProductCategories);
router.get('/categories/inDepartment/:department_id',categoriesValidator.validate('getDepartmentCategories'),categoriesController.getDepartmentCategories);
router.get('/categories/:category_id',categoriesValidator.validate('category'),categoriesController.category);
router.get('/categories',categoriesController.categories);



module.exports = router;