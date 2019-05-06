var DataTypes = require('sequelize/lib/data-types');
const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Product = sequelize.define('product',{

    product_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {

        type: Sequelize.STRING(100),
        allowNull: false,

    },
    description: {

        type: Sequelize.STRING(1000),
        allowNull: false,

    },
    price: {

        type: DataTypes.DECIMAL(10,2),
        allowNull: false,

    },
    discounted_price: {

        type: DataTypes.DECIMAL(10,2),
        allowNull: false,

    },
    thumbnail: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING(150),
       
    },
    image_2: {
        type: Sequelize.STRING(150),
       
    },
    display:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    }


},{timestamps: false});

module.exports = Product;