var express = require('express');
var router = express.Router();
var chargebee = require('chargebee');
const { getCustomerSubscription } = require('../../../public/trakr/scripts/chargeBee/getCustomerSubscription')

router.post('/trakr/chargeBee/getCustomerSubscription', async function(req, res, next) {
  const customerSubscription = await getCustomerSubscription(req.body)
  res.send(customerSubscription)
});

module.exports = router;