const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, { 
    dialect: 'mysql',
    host: 'localhost'

});

module.exports = sequelize;