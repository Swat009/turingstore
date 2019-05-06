const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Attribute = sequelize.define('attribute',{

    attribute_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {

        type: Sequelize.STRING(32),
        allowNull: false,

    }
   


},{timestamps: false});

module.exports = Attribute;