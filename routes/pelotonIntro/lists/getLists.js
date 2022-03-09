var express = require('express');
var router = express.Router();
const { mongoQuery } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')

router.post('/pelotonIntro/lists/getLists', async function(req, res, next) {
  const list = await mongoQuery('peloton', req.body.list, '', 10000000)
  res.send(list)
})

module.exports = router;