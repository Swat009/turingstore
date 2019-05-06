const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const ShippingRegion = sequelize.define('shippingregion',{

    shipping_region_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    shipping_region: {

        type: Sequelize.STRING(100),
        allowNull: false,

    }
    

},{timestamps: false});

module.exports = ShippingRegion;