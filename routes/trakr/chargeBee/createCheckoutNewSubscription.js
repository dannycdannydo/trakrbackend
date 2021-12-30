var express = require('express');
var router = express.Router();
const { createCheckoutNewSubscription } = require('../../../public/trakr/scripts/chargeBee/createCheckoutNewSubscription')



router.post('/trakr/chargeBee/createCheckoutNewSubscription', async function(req, res, next) {
  const url = await createCheckoutNewSubscription(req.body)
  res.send(url)
});

module.exports = router;