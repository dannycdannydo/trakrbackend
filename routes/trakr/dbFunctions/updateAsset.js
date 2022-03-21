var express = require('express');
var router = express.Router();
const { mongoReplace } = require('../../../public/trakr/scripts/db/mongoFunctions')
const { getOrganisations } = require('../../../public/trakr/scripts/auth/getOrganisations')
const _ = require('lodash')

router.post('/trakr/dbFunctions/replaceAsset', async function(req, res, next) {
  const id = req.body.data._id
  delete req.body.data._id
  const userId = req.body.user.sub
  const orgs = await getOrganisations(userId)
  if (orgs[0]) {
    for (var o in orgs) {
      let db = 'orgUploads'
      let collection = orgs[o]
      mongoReplace(db, collection, id, req.body.data)
    }
  }
  let collection = 'brochures'
  let db = 'trakr'
  if (req.body.user.email && !req.body.user.email.includes('@trakr.it')) {
    collection = req.body.user.email
    db = 'userUploads'
  }
  const result = await mongoReplace(db, collection, id, req.body.data)
  res.send(result)
});

module.exports = router;