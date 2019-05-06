const Sequelize = require('sequelize'); 
var DataTypes = require('sequelize/lib/data-types');
const sequelize = require('../util/database');

const Order = sequelize.define('order',{

    order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    total_amount: {

        type: DataTypes.DECIMAL(10,2),
        defaultValue: 1000000,
       
        
    },
    shipping_id:{

        type: Sequelize.INTEGER,
        allowNull: false
    },
    tax_id:{
        type: Sequelize.INTEGER,
        allowNull: false

    },
    shipped_on:{
        
        type:DataTypes.DATE,
       
    },
    created_on:{
        
        type:DataTypes.DATE,
        allowNull: false,
       
    },
    auth_code:{

        type: Sequelize.STRING(50),

    },
    status: {

        type: Sequelize.INTEGER,
        defaultValue: 0,

    },
    comments:{
        type: Sequelize.STRING(255),
    }

},{timestamps: false});

module.exports = Order;