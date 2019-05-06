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

        type: Sequelize.STRING(50),
        allowNull: false,

    },
    email: {

        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true

    },
    password: {

        type: Sequelize.STRING,
        allowNull: false,


    },
    address_1: {

        type: Sequelize.STRING(100),
        defaultValue: ""
        

    },
    address_2: {

        type: Sequelize.STRING(100),
        defaultValue: ""
       

    },
    city: {

        type: Sequelize.STRING(100),
        defaultValue: ""
       

    },
    region: {

        type: Sequelize.STRING(100),
        defaultValue: ""
        

    },
    postal_code: {

        type: Sequelize.STRING(100),
        defaultValue: ""
       

    },
    country: {

        type: Sequelize.STRING(100),
        defaultValue: ""
       

    },
    shipping_region_id: {

        type: Sequelize.INTEGER,
        defaultValue: -1
       

    },
    day_phone: {

        type: Sequelize.STRING(100),
        defaultValue: ""
       
    },
    eve_phone: {

        type: Sequelize.STRING(100),
        defaultValue: ""
        

    },
    mob_phone: {

        type: Sequelize.STRING(100),
        defaultValue: ""
       
    },
    facebookProviderId: {
        type: Sequelize.STRING,
    },
    credit_card: {

        type: Sequelize.STRING
    }
   


},{timestamps: false});

module.exports = Customer;