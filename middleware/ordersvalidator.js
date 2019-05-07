const { body,param,query,check } = require('express-validator/check')
exports.validate = (method) => {
    switch (method) {

        case 'createOrder': {
            return [

                body('cart_id','USR_02,The cart_id is required.')
                .trim()
                .not()
                .isEmpty(),
                body('shipping_id','USR_02,The shipping_id is required.')
                .trim()
                .not()
                .isEmpty()
                .isInt().withMessage('shipping_id must be an integer.'),
                body('tax_id','USR_02,The tax_id is required.')
                .trim()
                .not()
                .isEmpty()
                .isInt().withMessage('tax_id must be an integer.'),
               
            ]
        }
        case 'getOrder': {
            return [

                param('order_id','USR_02,The order_id is required.')
                .trim()
                .not()
                .isEmpty()
                .isInt().withMessage('order_id must be an integer.'),        
                
            ]
        }
        
        
      
        case 'getShortDetail': {
            return [

                param('order_id','USR_02,The order_id is required.')
                .trim()
                .not()
                .isEmpty()
                .isInt().withMessage('order_id must be an integer.'),        
                
            ]
        }
    }
}