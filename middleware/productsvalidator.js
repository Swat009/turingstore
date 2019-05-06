const { body,param,query,check } = require('express-validator/check')
exports.validate = (method) => {
switch (method) {
    case 'search': {
        return [
            query('query_string','PRO_02,The query_string is required.')
            .trim()
            .not()
            .isEmpty(),
            query('limit')
            .isInt().withMessage('PRO_01,Limit must be an integer.')
            .optional(),
            query('page')
            .isInt().withMessage('PRO_02,Page must be an integer.')
            .optional(),
            query('description_length')
            .isInt().withMessage('PRO_03,Description length must be an integer.')
            .optional(),
        ];
    }
    case 'addReview': {
        return [
            param('productId','PRO_04,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('PRO_04,The product_id is integer value.'),
            body('review','PRO_05,The review is required.')
            .trim()
            .not()
            .isEmpty(),
            body('rating','PRO_06,The rating is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('PRO_03,Rating must be an integer.'),

        ];
    }
    case 'getReview': {
        return [
            param('productId','PRO_04,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('PRO_04,The product_id is integer value.'),

        ];
    }
    case 'getProduct':{
        return [

            param('productId','PRO_04,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('PRO_04,The product_id is integer value.'),
        ];
    }
    case 'getProducts':{
        return [

            query('limit')
            .isInt().withMessage('PRO_01,Limit must be an integer.')
            .optional(),
            query('page')
            .isInt().withMessage('PRO_02,Page must be an integer.')
            .optional(),
            query('description_length')
            .isInt().withMessage('PRO_03,Description must be an integer.')
            .optional(),


        ];
    }
    case 'getProductsInCategory':{

        return [
            param('category_id','PRO_11,The category_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('PRO_11,The category_id must be an integer value.'),
            query('limit')
            .isInt().withMessage('PRO_01,Limit must be an integer.')
            .optional(),
            query('page')
            .isInt().withMessage('PRO_03,Page must be an integer.')
            .optional(),
            query('description_length')
            .isInt().withMessage('PRO_05,Description Length must be an integer.')
            .optional(),

        ];


    }
    case 'getProductsInDepartment':{

        return [

            param('department_id','PRO_12,The department_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('PRO_12,The department_id is not integer value.'),
            query('limit')
            .isInt().withMessage('PRO_01,Limit must be an integer.')
            .optional(),
            query('page')
            .isInt().withMessage('PRO_03,Page must be an integer.')
            .optional(),
            query('description_length')
            .isInt().withMessage('PRO_05,Description length must be an integer.')
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