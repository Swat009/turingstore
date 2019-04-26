var stripe = require("stripe")("sk_test_95pYBb5yZ85IzhBtxdPCDKV000iUJCuKdT");



exports.charge = (req, res, next) => {
    
    const token = req.body.stripeToken;
    const order_id = req.body.order_id;
    const description = req.body.description;
    const amount = req.body.amount;
    currency = 'usd';

    const charge = stripe.charges.create({
        amount: amount,
        currency: currency,
        description: description,
        source: token,
        metadata: {order_id: order_id}

    },function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            console.log(err);// The card has been declined
        } else {
            res.send({
                success:true,
                data: charge
            });
        }
    });

};
