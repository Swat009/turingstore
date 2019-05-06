const express = require("express");
const isAuth = require('../middleware/is-auth');
const taxValidator = require("../middleware/taxvalidator");
const taxController = require("../controllers/tax");

const router = express.Router();
router.get('/tax/:tax_id',taxValidator.validate('getTax'),taxController.getTax);
router.get('/tax',taxController.getTaxes);
module.exports = router;