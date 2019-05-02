const express = require("express");
const isAuth = require('../middleware/is-auth');
const stripeController = require("../controllers/stripe");
const stripeValidator = require("../middleware/stripevalidator");

const router = express.Router();
router.post('/stripe/charge',stripeValidator.validate('charge'),stripeController.charge);
module.exports = router;