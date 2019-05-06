const { body,param } = require('express-validator/check')
exports.validate = (method) => {
switch (method) {
    case 'department': {
        return [
            param('department_id','USR_02,The department_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,Deparment id  must be an integer.')
        ];
    }
}}