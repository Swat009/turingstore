const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Category = sequelize.define('category',{

    category_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {

        type: Sequelize.STRING(100),
        allowNull: false,

    },
    description : {

        type: Sequelize.STRING(1000),
        allowNull: false,

    }



},{timestamps: false});

module.exports = Category;