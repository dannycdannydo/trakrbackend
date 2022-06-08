var express = require('express');
const { Console } = require('winston/lib/winston/transports');
var router = express.Router();
const { getGraphToken } = require('../../../public/trakr/scripts/coyote/auth')
const { forwardEmail, getUser } = require('../../../public/trakr/scripts/coyote/graphRequest')

router.post('/trakr/coyote/forwardEmail', async function(req, res, next) {
    console.log(req.body)
    let graphToken = ''
    try {
        if(!req.body.graphToken) {
            graphToken = JSON.parse(await getGraphToken(req.body.token))
            console.log(graphToken)
            if (graphToken.error) {
                res.send({ status: graphToken.error, graphToken: graphToken })
                return
            } else {
                graphToken = graphToken.access_token
            }
        } else {
            graphToken = req.body.graphToken
        }
        const result = await forwardEmail(graphToken, req.body.userEmail, req.body.emailID, req.body.info)
        console.log(result)
        res.send({ status: result.status, graphToken: graphToken })
    } catch (err) {
        console.log(err)
        res.send({ status: 'error', graphToken: {error: err} })
    }
});

module.exports = router;
