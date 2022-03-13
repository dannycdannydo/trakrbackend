var express = require('express');
var router = express.Router();
const { getUser } = require('../../../public/trakr/scripts/auth/getUser')

router.post('/trakr/auth/getUser', async function(req, res, next) {
    const id = req.body.id
    const result = await getUser(id)
    res.send(result)
});

module.exports = router;