const { body,param,query,check } = require('express-validator/check')
exports.validate = (method) => {
switch (method) {
    case 'search': {
        return [
            query('query_string','USR_02,The query_string is required.')
            .trim()
            .not()
            .isEmpty(),
            query('limit')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),
            query('page')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),
            query('description_length')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),
        ];
    }
    case 'addReview': {
        return [
            body('product_id','USR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),
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
    case 'getReview': {
        return [
            param('productId','USR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),

        ];
    }
    case 'getProduct':{
        return [

            param('productId','USR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),
            


        ];
    }
    case 'getProducts':{
        return [

            query('limit')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),
            query('page')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),
            query('description_length')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),


        ];
    }
    case 'getProductsInCategory':{

        return [


            param('category_id','USR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The category_id is not integer value.'),
            query('limit')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),
            query('page')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),
            query('description_length')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),


        ];


    }
    case 'getProductsInDepartment':{

        return [

            param('department_id','USR_02,The department_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The category_id is not integer value.'),
            query('limit')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),
            query('page')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),
            query('description_length')
            .isInt().withMessage('Limit must be an integer.')
            .optional(),

        ];
    }
    case 'getProductLocations':{

        return [

            param('product_id','USR_02,The product_id_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),
            

        ];


    }



    
  
}}