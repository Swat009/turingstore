const Sequelize = require('sequelize'); 

const sequelize = require('../util/database');

const Review = sequelize.define('review',{

   
    review: {

        type: Sequelize.TEXT,
        allowNull: false,

    },
    rating: {

        type: Sequelize.INTEGER,
        allowNull: false,

    },
   



},{timestamps: false});

module.exports = Review;