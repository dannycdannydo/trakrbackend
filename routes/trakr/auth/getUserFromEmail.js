var express = require('express');
var router = express.Router();
var axios = require("axios").default;
const { getUserFromEmail } = require('../../../public/trakr/scripts/auth/getUserFromEmail')
const { jwtCheck } = require('../../../public/trakr/scripts/auth/jwtCheck')


router.post('/trakr/auth/getUserFromEmail', jwtCheck, async function(req, res, next) {
    console.log(req.body)
    const result = await getUserFromEmail(req.body)
    res.send(result)
});

module.exports = router;