var express = require('express');
var router = express.Router();
const { createCustomer } = require('../../../public/trakr/scripts/chargeBee/createCustomer')

router.post('/trakr/chargeBee/createCustomer', async function(req, res, next) {
    const customer = createCustomer(req.body)
    res.send(customer)
});

module.exports = router;