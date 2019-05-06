const { body,param } = require('express-validator/check')
exports.validate = (method) => {
switch (method) {
    case 'add': {
        return [
            body('product_id','CAR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('CAR_02,The product_id is integer value.'),
            body('cart_id','CAR_01,The cart_id is required.')
            .trim()
            .not()
            .isEmpty(),
            body('attributes','CAR_01,The attribute is required.')
            .trim()
            .not()
            .isEmpty()
            
        ];
    }
    case 'getcartId':{
        return [
            param('cart_id','CAR_01,The cart_id is required.')
            .trim()
            .not()
            .isEmpty()

        ]

    }

    case 'removeProduct':{
        return [

            param('item_id','CAR_03,The item_id is required.')
            .trim()
            .not()
            .isEmpty()

        ]
    }

    case 'empty':{

        return [

            param('cart_id','CAR_02,The cart_id is required.')
            .trim()
            .not()
            .isEmpty()
        ]
    }

    case 'update':{

        return [

            param('item_id','CAR_05,The item_id is required.')
            .trim()
            .not()
            .isEmpty(),
            body('quantity','CAR_04,The quantity is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('CAR_04,The quantity should be an integer value.'),
        ]
    }

    case 'totalAmount':{

        return [
            param('cart_id','CAR_01,The cart_id is required.')
            .trim()
            .not()
            .isEmpty()
        ]
    }

   

  
}}