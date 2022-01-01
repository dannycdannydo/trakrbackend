var express = require('express');
var router = express.Router();
var axios = require("axios").default;
const { getUserFromEmail } = require('../../../public/trakr/scripts/auth/getUserFromEmail')


router.post('/trakr/auth/getUserFromEmail', async function(req, res, next) {
    const result = await getUserFromEmail(req.body)
    res.send(result)
});

module.exports = router;