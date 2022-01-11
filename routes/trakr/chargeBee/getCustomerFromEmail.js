var express = require('express');
var router = express.Router();
const { getCustomerFromEmail } = require('../../../public/trakr/scripts/chargeBee/getCustomerFromEmail')

router.post('/trakr/chargeBee/getCustomerFromEmail', async function(req, res, next) {
  const customer = await getCustomerFromEmail(req.body)
  res.send(customer)
});

module.exports = router;