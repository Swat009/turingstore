const Sequelize = require('sequelize');

const sequelize = new Sequelize('turingshop', 'root', 'Testing@123', { 
    dialect: 'mysql',
    host: 'localhost'

});

module.exports = sequelize;