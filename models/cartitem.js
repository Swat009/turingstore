var DataTypes = require('sequelize/lib/data-types');
const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const CartItem = sequelize.define('cartitem',{


    item_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
  
    attributes : {

        type: Sequelize.STRING,
        allowNull: false,

    },
    quantity: {

        type: Sequelize.INTEGER,
        allowNull: false,

    },
   


},{timestamps: false});

module.exports = CartItem;