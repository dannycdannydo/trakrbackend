var express = require('express');
var router = express.Router();

router.post('/trakr/lists/get', async function(req, res, next) {
  try {
    console.log(req.body)
    const list = require(`../../../public/trakr/lists/${req.body.list}.js`)
    res.send(list[req.body.list])
  } catch {
    res.send('failed')
  }
});

module.exports = router;