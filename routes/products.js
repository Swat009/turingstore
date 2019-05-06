const express = require("express");
const isAuth = require('../middleware/is-auth');
const productsController = require("../controllers/products");
const productsValidator = require("../middleware/productsvalidator");

const router = express.Router();
router.get('/products/inCategory/:category_id',productsValidator.validate('getProductsInCategory'),productsController.getProductsInCategory);
router.get('/products/inDepartment/:department_id',productsValidator.validate('getProductsInDepartment'),productsController.getProductsInDepartment);
router.get('/products/search',productsValidator.validate('search'),productsController.searchProduct);
router.get('/products/:productId/reviews',productsValidator.validate('getReview'),productsController.getReview);
router.post('/products/:productId/reviews',isAuth,productsValidator.validate('addReview'),productsController.addReview);
router.get('/products/:product_id/locations',productsValidator.validate('getProductLocations'),productsController.getProductLocations);
router.get('/products/:productId/details',productsValidator.validate('getProduct'),productsController.getProduct);
router.get('/products/:productId',productsValidator.validate('getProduct'),productsController.getProduct);
router.get('/products',productsValidator.validate('getProducts'),productsController.getProducts);


module.exports = router;

