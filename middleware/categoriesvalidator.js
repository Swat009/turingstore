const { body,param } = require('express-validator/check')

exports.validate = (method) => {
switch (method) {
 

    case 'category':{
        return [

            param('category_id','USR_02,The category_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The category_id is integer value.'),

        ]
    }
    case 'getProductCategories':{

        return [

            param('product_id','USR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),

        ]
    }

    case 'getDepartmentCategories':{

        return [

            param('department_id','USR_02,The department_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The department_id is integer value.'),

        ]


    }

   
  
}}