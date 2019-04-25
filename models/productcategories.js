const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const ProductCategories = sequelize.define('productcategories',{

   


},{timestamps: false});

module.exports = ProductCategories;