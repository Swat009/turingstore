const express = require("express");
const isAuth = require('../middleware/is-auth');
const productsController = require("../controllers/products");

const router = express.Router();
router.get('/products/:productId/reviews',productsController.getReview);
router.post('/products/:productId/reviews', isAuth, productsController.addReview);
router.get('/products/:productId/locations',productsController.getProductLocations);
router.get('/products',productsController.getProducts);


module.exports = router;