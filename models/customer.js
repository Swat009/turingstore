const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Customer = sequelize.define('customer',{
 
    customer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    email: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    address_1: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    address_2: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    city: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    region: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    postal_code: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    country: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    shipping_region_id: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    day_phone: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    eve_phone: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    mob_phone: {

        type: Sequelize.STRING,
        allowNull: false,

    },
   


});

module.exports = Customer;