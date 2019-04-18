const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const ProductComplete = sequelize.define('productcomplete',{

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
    description : {

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
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image2: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    thumbnail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    display: {
        type: Sequelize.STRING,
        allowNull: false,
    }





});

module.exports = ProductComplete;