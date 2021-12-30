var express = require('express');
var router = express.Router();
var axios = require("axios").default;
const { addMetaData } = require('../../../public/trakr/scripts/auth/addMetaData')


router.post('/trakr/auth/addMetaData', async function(req, res, next) {
    const result = await addMetaData(req.body)
    return result
});

module.exports = router;