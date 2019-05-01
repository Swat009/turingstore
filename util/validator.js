const { validationResult } = require('express-validator/check');

const validationHandler = (req,res) => {
  
    const errors = validationResult(req);
    if( !errors.isEmpty()){

        console.log(errors.array());

        error = errors.array()[0];
        error_data = error.msg.split(",");
        return ["error",{
            error:{
                status:400,
                code: error_data[0],
                message: error_data[1],
                field: error.param
            }
        }];

    }
    return ["ok",{}];
}

module.exports = validationHandler;