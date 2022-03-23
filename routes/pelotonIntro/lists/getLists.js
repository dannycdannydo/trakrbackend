var express = require('express');
var router = express.Router();
const { mongoQuery } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')

router.post('/pelotonIntro/lists/getLists', async function(req, res, next) {
  const list = await mongoQuery('peloton', req.body.list, '', 10000000)
  console.log(list)
  list.sort(function(a, b) {
    var textA = a.text.toUpperCase();
    var textB = b.text.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  res.send(list)
})

module.exports = router;