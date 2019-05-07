var stripe = require("stripe")(process.env.STRIPEKEY);
const Order = require('../models/orders');
const validationHandler = require('../util/validator');


exports.charge = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }   
    const token = req.body.stripeToken;
    const order_id = req.body.order_id;
    const description = req.body.description;
    const amount = req.body.amount;
    currency = req.body.currency || 'usd';
    let currentOrder;
    Order.findByPk(order_id)
    .then(order =>{

        if(!order)
        {
            res.status(500).json({error:'Order not found'});
            throw new Error('Order not found');
        }
        if(order.status===1)
        {
            res.status(500).json({error:'Order already paid'});
            throw new Error('Order already paid');

        }

        currentOrder = order;
    })
    .then(()=>{

        return stripe.charges.create({
            amount: amount,
            currency: currency,
            description: description,
            source: token,
            metadata: {order_id: order_id}
    
        })

    }) 
    .then(charge=>{

        currentOrder.status=1;
        currentOrder.save()
        .then(()=>{

            res.send({
                success:true,
                data: charge
            });
        })   
        .catch(err => {

            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }); 
    
    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
   
};
