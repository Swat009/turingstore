const express = require("express");
const isAuth = require('../middleware/is-auth');
const categoriesController = require("../controllers/categories");

const router = express.Router();

router.get('/attributes',attibutesController.getAttributes);
router.get('/attributes/values/:attribute_id',attibutesController.getAttributeList);
router.get('/attributes/inProduct/:product_id',attributesController.getAttributeValues);
router.get('/attributes/:attribute_id',attributesController.getProductAttributes);




module.exports = router;