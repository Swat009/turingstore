const { body,param } = require('express-validator/check')

exports.validate = (method) => {
switch (method) {
 
    case 'getShippingRegion':{

        return [

            param('shipping_region_id','SHI_02,The shipping_region_id  is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('SHI_02,The shipping_region_id  must be an integer value.'),

        ]
    }
   
  
}}