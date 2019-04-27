const express = require("express");
const isAuth = require('../middleware/is-auth');
const departmentsController = require("../controllers/departments");

const router = express.Router();

router.get('/departments/:department_id',departmentsController.department);
router.get('/departments',departmentsController.departments);


module.exports = router;