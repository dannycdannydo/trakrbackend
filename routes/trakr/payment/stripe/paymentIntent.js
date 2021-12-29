var express = require('express');
var router = express.Router();
const stripe = require("stripe")('sk_test_51KBJoYCeSi98bLKfVPRKUdDLrC67hvaMysdHRd9m51ekDyabR88Get1nZ2LPzOlwLjykGl3L1BKW9YULxqx9b5XN00dtJf3Ql2');

router.post('/trakr/payment/stripe/paymentIntent', async function(req, res, next) {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router;