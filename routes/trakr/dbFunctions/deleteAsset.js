var express = require('express');
var router = express.Router();
const { mongoDelete } = require('../../../public/trakr/scripts/db/mongoFunctions')

router.post('/trakr/dbFunctions/deleteAsset', async function(req, res, next) {
  const id = req.body._id
  const result = mongoDelete('trakr', 'brochures', id)
  res.send(result)
});

module.exports = router;