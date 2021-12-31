var express = require('express');
var router = express.Router();
var axios = require("axios").default;
const { updateMetaData } = require('../../../public/trakr/scripts/auth/addMetaData')


router.post('/trakr/auth/addMetaData', async function(req, res, next) {
    const result = await updateMetaData(req.body, req.body.userId)
    return result
});

module.exports = router;