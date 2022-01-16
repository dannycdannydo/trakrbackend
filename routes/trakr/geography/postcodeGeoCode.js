var express = require('express');
var router = express.Router();
const postcodeGeoCode = require('../../../public/trakr/scripts/geography/postcodeGeoCode')

router.post('/trakr/geography/postcodeGeoCode', async function(req, res, next) {
  const result = await postcodeGeoCode.postcodeGeoCode(req.body.postcode)
  res.send(result)
});

module.exports = router;