var express = require('express');
var router = express.Router();
const { send } = require('../../../public/email/send')
var config = require('../../../config/config');
const { requestWhitelist } = require('express-winston');

router.post('/trakr/email/send', async function(req, res, next) {
  try {
    req.body.pword = config.trakrEmailPword
    const result = await send(req.body)
    res.send(result)
  } catch {
    res.send('failed')
  }
});

module.exports = router;