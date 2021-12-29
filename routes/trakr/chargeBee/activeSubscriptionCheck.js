var express = require('express');
var router = express.Router();
const { getCustomerSubscription } = require('../../../public/trakr/scripts/chargeBee/getCustomerSubscription')

router.post('/trakr/chargeBee/activeSubscriptionCheck', async function(req, res, next) {
    console.log(req.body)
  const customerSubscription = await getCustomerSubscription(req.body)
  console.log(customerSubscription)
  res.send(customerSubscription)
});

module.exports = router;