const express = require("express");
const isAuth = require('../middleware/is-auth');
const attributesController = require("../controllers/attributes");

const router = express.Router();


router.get('/attributes/values/:attribute_id',attributesController.getAttributeValues);
router.get('/attributes/inProduct/:product_id',attributesController.getProductAttributes);
router.get('/attributes/:attribute_id',attributesController.getAttribute);
router.get('/attributes',attributesController.getAttributes);




module.exports = router;