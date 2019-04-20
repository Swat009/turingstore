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
    password: {

        type: Sequelize.STRING,

    },
    address_1: {

        type: Sequelize.STRING,
        

    },
    address_2: {

        type: Sequelize.STRING,
       

    },
    city: {

        type: Sequelize.STRING,
       

    },
    region: {

        type: Sequelize.STRING,
        

    },
    postal_code: {

        type: Sequelize.STRING,
       

    },
    country: {

        type: Sequelize.STRING,
       

    },
    shipping_region_id: {

        type: Sequelize.STRING,
       

    },
    day_phone: {

        type: Sequelize.STRING,
       
    },
    eve_phone: {

        type: Sequelize.STRING,
        

    },
    mob_phone: {

        type: Sequelize.STRING,
       
    },
   


});

module.exports = Customer;