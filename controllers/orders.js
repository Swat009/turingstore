const { validationResult } = require('express-validator/check');
const { body } = require('express-validator/check');


exports.validate = (method) => {
    switch (method) {
    

        case 'order': {
            return [
                
                //body('customer_id').exists(),
                //body('shipping_id').exists(), 
                //body('tax_id').exists()
            ]
        }
    }
}



exports.createOrder = (req, res, next) => {
 
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors);
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.', 
            errors: errors.array()
        })
    }

    const cart_id = req.body.cart_id;
    const customer_id = req.body.customer_id;
    const shipping_id = req.body.shipping_id;
    const tax_id = req.body.tax_id;

    console.log("card id "+card_id);

    res.status(201).json({

        orderid: "12345",
        cart_id: cart_id,
        test: "hello"   

    });
};