var express = require('express');
var router = express.Router();
const { lRegQueryMongoliser, mongoQuery } = require('../../../public/trakr/scripts/db/mongoFunctions')

router.post('/trakr/dbFunctions/lregQuery', async function(req, res, next) {
    if(isEmpty(req.body)){
        res.send(null)
        return
    }
    const query = await lRegQueryMongoliser(req.body)
    const results = await mongoQuery('trakr', 'landreg', query, 10000000, null)
    res.send(results)
});

function isEmpty(obj) {
    for(var i in obj) { return false; }
    return true;
  }

module.exports = router;