var DataTypes = require('sequelize/lib/data-types');
const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Cart = sequelize.define('cart',{


    cart_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },

    item_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    attributes : {

        type: Sequelize.STRING,
        allowNull: false,

    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      
    },
    quantity: {

        type: Sequelize.INTEGER,
        allowNull: false,

    },
    subtotal: {

        type: DataTypes.DECIMAL(10,2),
        allowNull: false,

    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      
    },



},{timestamps: false});

module.exports = Cart;