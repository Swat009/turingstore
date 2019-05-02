const { body,param } = require('express-validator/check')
exports.validate = (method) => {
switch (method) {
    case 'add': {
        return [
            body('product_id','USR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),
            body('cart_id','USR_02,The cart_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),
            body('attributes','USR_02,The attribute is required.')
            .trim()
            .not()
            .isEmpty()
            
        ];
    }
    case 'getcartId':{
        return [
            param('cart_id','USR_02,The cart_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The cart_id is integer value.'),

        ]

    }

    case 'removeProduct':{
        return [

            param('item_id','USR_02,The item_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The item_id is integer value.'),

        ]
    }

    case 'empty':{

        return [

            param('cart_id','USR_02,The item_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The item_id is integer value.'),

        ]
    }

    case 'update':{

        return [

            body('item_id','USR_02,The product_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),
            body('quantity','USR_02,The cart_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The product_id is integer value.'),
           

        ]
    }

    case 'totalAmount':{

        return [
            param('cart_id','USR_02,The cart_id is required.')
            .trim()
            .not()
            .isEmpty()
            .isInt().withMessage('USR_02,The cart_id is integer value.'),
        ]
    }

   

  
}}