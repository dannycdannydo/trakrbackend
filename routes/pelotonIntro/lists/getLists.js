var express = require('express');
var router = express.Router();

router.post('/pelotonIntro/lists/getLists', async function(req, res, next) {
  console.log(req.body)
  const list = require(`../../../public/pelotonIntro/Objs/${req.body.list}.json`)
  res.send(JSON.parse(JSON.stringify(list)))
})

module.exports = router;