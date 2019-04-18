const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const ProductLocations = sequelize.define('productlocations',{

    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      
    },
    category_name: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    department_name: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      
    },





});

module.exports = ProductLocation;