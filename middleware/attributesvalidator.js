const { body,param } = require('express-validator/check')

exports.validate = (method) => {
switch (method) {
 
    case 'getAttributeValues':{
        return [

            param('attribute_id','USR_02,The attribute_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The attribute_id is integer value.'),

        ]
    }
    case 'getProductAttributes':{

        return [

            param('product_id','USR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),

        ]
    }

    case 'getAttribute':{

        return [

            param('attribute_id','USR_02,The attribute_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The attribute_id is integer value.'),

        ]


    }

   
  
}}