const express = require("express");
const isAuth = require('../middleware/is-auth');
const attributesController = require("../controllers/attributes");
const attributesValidator = require("../middleware/attributesvalidator");
const router = express.Router();


router.get('/attributes/values/:attribute_id',attributesValidator.validate('getAttributeValues'),attributesController.getAttributeValues);
router.get('/attributes/inProduct/:product_id',attributesValidator.validate('getProductAttributes'),attributesController.getProductAttributes);
router.get('/attributes/:attribute_id',attributesValidator.validate('getAttribute'),attributesController.getAttribute);
router.get('/attributes',attributesController.getAttributes);




module.exports = router;