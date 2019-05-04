const Sequelize = require('sequelize'); 
var DataTypes = require('sequelize/lib/data-types');
const sequelize = require('../util/database');

const OrderDetail = sequelize.define('orderdetail',{

   

    item_id: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    atttributes:{
       
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'yo',

    },
    product_name:{
        type: Sequelize.STRING,
        allowNull: false,

    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    unit_cost:{

        type: Sequelize.INTEGER,
        allowNull: false,

    }
    


},{timestamps: false});

module.exports = OrderDetail;