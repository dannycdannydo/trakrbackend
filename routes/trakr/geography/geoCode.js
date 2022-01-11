var express = require('express');
var router = express.Router();
const geoCode = require('../../../public/trakr/scripts/geography/geoCode')

router.post('/trakr/geography/geoCode', async function(req, res, next) {
  const result = await geoCode.geocode(req.body.address)
  res.send(result)
});

module.exports = router;