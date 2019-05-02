const { body,param } = require('express-validator/check')

exports.validate = (method) => {
switch (method) {
 
    case 'charge':{

        return [

            body('stripeToken','USR_02,The stripeToken  is required.')
            .trim()
            .not()
            .isEmpty(),
            body('order_id','USR_02,The order_id  is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The order_id  is integer value.'),
            body('description','USR_02,The description is required.')
            .trim()
            .not()
            .isEmpty(),
            body('amount','USR_02,The amount is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The amount is integer value.'),
       

        ]
    }
   
  
}}