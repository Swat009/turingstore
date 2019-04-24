const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Product = sequelize.define('product',{

    product_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    price: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    discounted_price: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    thumbnail: {
        type: Sequelize.STRING,
        allowNull: false,
    }



},{timestamps: false});

module.exports = Product;