var express = require('express');
var router = express.Router();
const { mongoDelete } = require('../../../public/trakr/scripts/db/mongoFunctions')

router.post('/trakr/dbFunctions/deleteAsset', async function(req, res, next) {
  const id = req.body.data._id
  let container = 'brochures'
  let db = 'trakr'
  if (req.body.user && !req.body.user.includes('@trakr.it')) {
    container = req.body.user
    db = 'userUploads'
  }
  const result = mongoDelete(db, container, id)
  res.send(result)
});

module.exports = router;