var stripe = require("stripe")(process.env.STRIPEKEY);



exports.charge = (req, res, next) => {
    
    const token = req.body.stripeToken;
    const order_id = req.body.order_id;
    const description = req.body.description;
    const amount = req.body.amount;
    currency = req.body.currency || 'usd';

    const charge = stripe.charges.create({
        amount: amount,
        currency: currency,
        description: description,
        source: token,
        metadata: {order_id: order_id}

    })
    .then(charge=>{

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

};
