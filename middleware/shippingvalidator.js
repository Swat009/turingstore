const { body,param } = require('express-validator/check')

exports.validate = (method) => {
switch (method) {
 
    case 'getShippingRegion':{

        return [

            param('shipping_region_id','USR_02,The shipping_region_id  is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The shipping_region_id  is integer value.'),

        ]
    }
   
  
}}