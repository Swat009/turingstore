const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Shipping = sequelize.define('shipping',{

    shipping_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    shipping_type: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    shipping_cost: {

        type: DataTypes.DECIMAL(10,2),
        allowNull: false,

    }


},{timestamps: false});

module.exports = Shipping;