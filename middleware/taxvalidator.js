const { body,param } = require('express-validator/check')
exports.validate = (method) => {
switch (method) {
 

    case 'getTax':{
        return [

            param('item_id','USR_02,The item_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The item_id is integer value.'),

        ]
    }

   
  
}}