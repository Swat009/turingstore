const { body,param,check } = require('express-validator/check')
exports.validate = (method) => {
switch (method) {
    case 'search': {
        return [
            body('query_string','USR_02,The query_string is required.')
            .trim()
            .not()
            .isEmpty()
        ];
    }
    case 'getReview': {
        return [
            body('product_id','USR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty(),
            body('review','USR_02,The review is required.')
            .trim()
            .not()
            .isEmpty(),
            body('rating','USR_02,The rating is required.')
            .trim()
            .not()
            .isEmpty(),

        ];
    }
    
  
}}