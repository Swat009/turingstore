const Sequelize = require('sequelize'); 

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
        allowNull: false,

    },
    comments:{

        type: Sequelize.STRING,

    },
    auth_code:{

        type: Sequelize.STRING,

    },
    status: {

        type: Sequelize.INTEGER,

    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    shipping_id:{
        type: Sequelize.INTEGER,
    },
    tax_id:{

        type: Sequelize.INTEGER,
    },
    comments:{

        type: Sequelize.STRING,


    }



    


},{timestamps: false});

module.exports = Department;