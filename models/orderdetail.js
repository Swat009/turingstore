const Sequelize = require('sequelize'); 
var DataTypes = require('sequelize/lib/data-types');
const sequelize = require('../util/database');
const OrderDetail = sequelize.define('orderdetail',{

   
    item_id: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    attributes:{
       
        type: Sequelize.STRING(1000),
        allowNull: false,
       

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

        type: DataTypes.DECIMAL(10,2),
        allowNull: false,

    }
    


},{timestamps: false});

module.exports = OrderDetail;