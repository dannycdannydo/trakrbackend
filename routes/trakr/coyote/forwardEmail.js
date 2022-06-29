var express = require('express');
var router = express.Router();
const { getGraphToken } = require('../../../public/trakr/scripts/coyote/auth')
const { forwardEmail, getUser } = require('../../../public/trakr/scripts/coyote/graphRequest')

router.post('/trakr/coyote/forwardEmail', async function(req, res, next) {
    let graphToken = ''
    try {
        if(!req.body.graphToken) {
            graphToken = JSON.parse(await getGraphToken(req.body.token))
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
        res.send({ status: result.status, graphToken: graphToken })
    } catch (err) {
        console.log(err)
        res.send({ status: 'error', graphToken: {error: err} })
    }
});

module.exports = router;
