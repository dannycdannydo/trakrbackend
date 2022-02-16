var express = require('express');
var router = express.Router();
const { mongoReplace } = require('../../../public/trakr/scripts/db/mongoFunctions')
const _ = require('lodash')

router.post('/trakr/dbFunctions/replaceAsset', async function(req, res, next) {
  const id = req.body.data._id
  delete req.body.data._id
  let container = 'brochures'
  let db = 'trakr'
  if (req.body.user && !req.body.user.includes('@trakr.it')) {
    container = req.body.user
    db = 'userUploads'
  }
  const result = await mongoReplace(db, container, id, req.body.data)
  res.send(result)
});

module.exports = router;