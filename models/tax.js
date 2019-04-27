var DataTypes = require('sequelize/lib/data-types');
const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Tax = sequelize.define('tax',{

    tax_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tax_type: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    tax_percentage: {

        type: DataTypes.DECIMAL(10,2),
        allowNull: false,

    }


},{timestamps: false});

module.exports = Tax;