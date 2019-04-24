const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Review = sequelize.define('review',{

   
    name: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    review: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    rating: {

        type: Sequelize.INTEGER,
        allowNull: false,

    },
    created_on: {
        type: Sequelize.STRING,
        allowNull: false,
    }



},{timestamps: false});

module.exports = Review;