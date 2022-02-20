var express = require('express');
var router = express.Router();
const { geocode } = require('../../../public/pelotonIntro/scripts/geography/geocode')

router.post('/pelotonIntro/geography/geocode', async function(req, res, next) {
  console.log(req.body)
  let result = {}
  try{
    result = await geocode(req.body.address)
  } catch {
    result = {status: 'failed'}
  }
  res.send(result)
});


module.exports = router;