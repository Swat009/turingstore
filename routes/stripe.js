const express = require("express");
const isAuth = require('../middleware/is-auth');
const stripeController = require("../controllers/stripe");

const router = express.Router();
router.post('/stripe/charge',stripeController.charge);
module.exports = router;