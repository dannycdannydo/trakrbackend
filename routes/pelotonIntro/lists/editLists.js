var express = require('express');
var router = express.Router();
const { mongoInsert, mongoDeleteGeneral } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')

router.post('/pelotonIntro/lists/editLists', async function(req, res, next) {
  if (req.body.add) {
    for (const [key, value] of Object.entries(req.body.add)) {
      if (value[0]) {
        for(var i in value) {
          await mongoInsert('peloton', key, {value: value[i], text: value[i]})
        }
      }
    }
  }
  if (req.body.remove) {
    for (const [key, value] of Object.entries(req.body.remove)) {
      if (value[0]) {
        for(var i in value) {
          await mongoDeleteGeneral('peloton', key, { "text": value[i] })
        }
      }
    }
  }
  res.send('Success')
})


module.exports = router;