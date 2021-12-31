var express = require('express');
var router = express.Router();
var axios = require("axios").default;
const { updateMetaData } = require('../../../public/trakr/scripts/auth/updateMetaData')


router.post('/trakr/auth/updateMetaData', async function(req, res, next) {
    const result = await updateMetaData(req.body, req.body.userId)
    return result
});

module.exports = router;