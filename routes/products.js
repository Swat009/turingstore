const express = require("express");
const isAuth = require('../middleware/is-auth');
const productsController = require("../controllers/products");

const router = express.Router();
router.get('/products/inCategory/:category_id',productsController.getProductsInCategory);
router.get('/products/inDepartment/:department_id',productsController.getProductsInDepartment);
router.get('/products/:productId/reviews',productsController.getReview);
router.post('/products/:productId/reviews', productsController.addReview);
router.get('/products/:productId/locations',productsController.getProductLocations);
router.get('/products/:productId/details',productsController.getProduct);
router.get('/products/:productId',productsController.getProduct);
router.get('/products',productsController.getProducts);


module.exports = router;