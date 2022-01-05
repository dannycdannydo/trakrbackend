var express = require('express');
var router = express.Router();

router.post('/pk3Website/lists/get', async function(req, res, next) {
  try {
    const list = require(`../../../public/pk3Website/lists/${req.body.list}.js`)
    res.send(list[req.body.list])
  } catch {
    res.send('failed')
  }
});

module.exports = router;