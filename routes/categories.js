const express = require("express");
const isAuth = require('../middleware/is-auth');
const categoriesController = require("../controllers/categories");

const router = express.Router();


router.get('/categories/inProduct/:product_id',categoriesController.getProductCategories);
router.get('/categories/inDepartment/:department_id',categoriesController.getDepartmentCategories);
router.get('/categories/:category_id',categoriesController.category);
router.get('/categories',categoriesController.categories);



module.exports = router;