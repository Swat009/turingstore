const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const ProductAttribute = sequelize.define('productattribute',{

   


},{timestamps: false});

module.exports = ProductAttribute;