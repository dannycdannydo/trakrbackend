var express = require('express');
var router = express.Router();
const { mongoReplace } = require('../../../public/trakr/scripts/db/mongoFunctions')
const _ = require('lodash')

router.post('/trakr/dbFunctions/replaceAsset', async function(req, res, next) {
  const id = req.body._id
  delete req.body._id
  const result = mongoReplace('trakr', 'brochures', id, req.body)
  res.send(result)
});

module.exports = router;