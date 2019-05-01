const { body } = require('express-validator/check')
exports.validate = (method) => {
switch (method) {
    case 'department': {
        return [
            body('department_id','USR_02,The department_id is required.')
            .trim()
            .not()
            .isEmpty()
        ];
    }

   

  
}}