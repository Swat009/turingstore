const { body,param } = require('express-validator/check')
exports.validate = (method) => {
switch (method) {
 

    case 'getTax':{
        return [

            param('tax_id','TAX_01,The tax_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('TAX_01,The tax_id must be an integer value.'),

        ]
    }

   
  
}}