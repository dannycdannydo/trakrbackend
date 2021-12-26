var express = require('express');
var router = express.Router();
const { brochureQueryMongoliser, mongoQuery, mongoSums } = require('../../../public/trakr/scripts/db/mongoFunctions')
const _ = require('lodash')

router.post('/trakr/dbFunctions/brochureQuery', async function(req, res, next) {
  let data = req.body
  let freq=10000000
  let sort= {
      'meta.dateCreated': -1
  };
  if(data.sort){
      sort = data.sort
  }
  if(data.freq){
      freq = data.freq
  }
  const mongolisedQuery = await brochureQueryMongoliser(data)
  let result = {}
  result.assets = await mongoQuery('trakr', 'brochures', mongolisedQuery, freq, sort)
  result.sums = await mongoSums(_.cloneDeep(result.assets))
  res.send(result)
});

module.exports = router;