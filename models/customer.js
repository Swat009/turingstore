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
        unique: true

    },
    password: {

        type: Sequelize.STRING,


    },
    address_1: {

        type: Sequelize.STRING,
        defaultValue: ""
        

    },
    address_2: {

        type: Sequelize.STRING,
        defaultValue: ""
       

    },
    city: {

        type: Sequelize.STRING,
        defaultValue: ""
       

    },
    region: {

        type: Sequelize.STRING,
        defaultValue: ""
        

    },
    postal_code: {

        type: Sequelize.STRING,
        defaultValue: ""
       

    },
    country: {

        type: Sequelize.STRING,
        defaultValue: ""
       

    },
    shipping_region_id: {

        type: Sequelize.STRING,
        defaultValue: ""
       

    },
    day_phone: {

        type: Sequelize.STRING,
        defaultValue: ""
       
    },
    eve_phone: {

        type: Sequelize.STRING,
        defaultValue: ""
        

    },
    mob_phone: {

        type: Sequelize.STRING,
        defaultValue: ""
       
    },
    facebookProviderId: {
        type: Sequelize.STRING,
    },
    facebookProviderToken: {
        type: Sequelize.STRING,
    },
    credit_card: {

        type: Sequelize.STRING
    }
   


},{timestamps: false});

module.exports = Customer;