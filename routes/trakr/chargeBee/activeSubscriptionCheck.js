var express = require('express');
var router = express.Router();
const { getCustomerSubscription } = require('../../../public/trakr/scripts/chargeBee/getCustomerSubscription')
const { getCustomerFromEmail } = require('../../../public/trakr/scripts/chargeBee/getCustomerFromEmail')

router.post('/trakr/chargeBee/activeSubscriptionCheck', async function(req, res, next) {
  if (req.body.email && !req.body.id) {
    const customer = await getCustomerFromEmail(req.body)
    req.body.id = customer.customer.id
  }
  console.log(req.body.id)
  const customerSubscription = await getCustomerSubscription({ id: req.body.id })
  res.send(customerSubscription)
});

module.exports = router;