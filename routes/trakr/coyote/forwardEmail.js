var express = require('express');
const { Console } = require('winston/lib/winston/transports');
var router = express.Router();
const { getGraphToken } = require('../../../public/trakr/scripts/coyote/auth')
const { forwardEmail, getUser } = require('../../../public/trakr/scripts/coyote/graphRequest')

router.post('/trakr/coyote/forwardEmail', async function(req, res, next) {
    const graphToken = await getGraphToken(req.body.token)
    console.log(JSON.parse(graphToken))
    const result = await forwardEmail(JSON.parse(graphToken).access_token, req.body.userEmail, req.body.emailID)
    res.send(result.status)
});

module.exports = router;