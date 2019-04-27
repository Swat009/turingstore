const express = require("express");
const isAuth = require('../middleware/is-auth');

const taxController = require("../controllers/tax");
const router = express.Router();

router.get('/tax',taxController.getTaxes);
router.get('/tax/tax_id',taxController.getTax);

module.exports = router;