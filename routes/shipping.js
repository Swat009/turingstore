const express = require("express");
const isAuth = require('../middleware/is-auth');
const shippingController = require("../controllers/shipping");
const shippingValidator = require("../middleware/shippingvalidator");

const router = express.Router();
router.get('/shipping/regions',shippingController.getShippingRegions);
router.get('/shipping/regions/:shipping_region_id',shippingValidator.validate('getShippingRegion'),shippingController.getShippingRegion);



module.exports = router;
