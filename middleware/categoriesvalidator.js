const { body,param,query } = require('express-validator/check')

exports.validate = (method) => {
switch (method) {

    case 'categories':{
        return [

            query('limit')
            .isInt().withMessage('PRO_01,Limit must be an integer.')
            .optional(),
            query('page')
            .isInt().withMessage('PRO_02,Page must be an integer.')
            .optional(),
            query('order','PRO_04,Ordering can either be by category_id or name.')
            .isIn('category_id','name')
            .optional(),

        ]
    }
 
    case 'category':{
        return [

            param('category_id','CAT_02,The category_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('CAT_02,The category_id should be an integer value.'),

        ]
    }
    case 'getProductCategories':{

        return [

            param('product_id','CAT_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('CAT_02,The product_id should be an integer value.'),

        ]
    }

    case 'getDepartmentCategories':{

        return [

            param('department_id','CAT_03,The department_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('CAT_03,The department_id should be an integer value.'),

        ]


    }

   
  
}}