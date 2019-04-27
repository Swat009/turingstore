const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Cart = sequelize.define('cart',{

    item_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    attributes : {

        type: Sequelize.STRING,
        allowNull: false,

    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
      
    },
    quantity: {

        type: Sequelize.INTEGER,
        allowNull: false,

    },
    subtotal: {

        type: Sequelize.STRING,
        allowNull: false,

    }



});

module.exports = Cart;