const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const ProductCart = sequelize.define('productcart',{

   


},{timestamps: false});

module.exports = ProductCart;