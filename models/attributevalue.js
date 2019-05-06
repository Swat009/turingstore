const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const AttributeValue = sequelize.define('attributevalue',{

    attribute_value_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    value: {

        type: Sequelize.STRING(100),
        allowNull: false,

    }
   


},{timestamps: false});

module.exports = AttributeValue;