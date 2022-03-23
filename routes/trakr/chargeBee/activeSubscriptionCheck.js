var express = require('express');
var router = express.Router();
const { getCustomerSubscription } = require('../../../public/trakr/scripts/chargeBee/getCustomerSubscription')
const { getCustomerFromEmail } = require('../../../public/trakr/scripts/chargeBee/getCustomerFromEmail')

router.post('/trakr/chargeBee/activeSubscriptionCheck', async function(req, res, next) {
  try {
    if (req.body.email) {
      const customer = await getCustomerFromEmail(req.body)
      const id = customer.customer.id
      const customerSubscription = await getCustomerSubscription({ id: id })
      console.log(customerSubscription)
      res.send(customerSubscription)
    }
  } catch {
    res.send({ subscription: { status: 'inactive' } })
  }
});

module.exports = router;