var express = require('express');
var router = express.Router();
const { createCustomer } = require('../../../public/trakr/scripts/chargeBee/createCustomer')
const { addMetaData } = require('../../../public/trakr/scripts/auth/addMetaData')



router.post('/trakr/auth/newUser', async function(req, res, next) {
    let user = {}
    user.email = req.body.params.email.email
    user.user_id = req.body.params.email.user_id
    const result = await createCustomer(user)
    await addMetaData(result, user.user_id)
    res.send(result)
});

module.exports = router;