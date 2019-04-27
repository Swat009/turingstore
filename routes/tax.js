const express = require("express");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/tax',stripeController.getTaxes);
router.get('/tax/tax_id',stripeController.getTax);

module.exports = router;