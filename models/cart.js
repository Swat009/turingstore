const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Cart = sequelize.define('carts',{

    cart_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      
       
    }


},{timestamps: false});

module.exports = Cart;