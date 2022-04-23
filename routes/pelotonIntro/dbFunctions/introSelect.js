var express = require('express');
var router = express.Router();
const { mongoQuery, mongoUpdate } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')
const { introSums } = require('../../../public/pelotonIntro/scripts/sums/introSums')
var ObjectId = require('mongodb').ObjectId; 


router.post('/pelotonIntro/dbFunctions/introSelect', async function(req, res, next) {
    if (!req.body.emailId || !req.body.introId || !req.body.function) {
      res.send('failed')
    }
    const asset = (await mongoQuery('peloton', 'intros', {"_id": ObjectId(req.body.introId)}, 1, {}))[0]
    if(req.body.function == 'select') {
      for (var i in asset.intros) {
        if (asset.intros[i].itemId && asset.intros[i].itemId == req.body.emailId) {
          asset.intros[i].selected = true
        } else {
          asset.intros[i].selected = false
        }
      }
    } else if (req.body.function == 'unselect') {
      for (var i in asset.intros) {
        if (asset.intros[i].itemId && asset.intros[i].itemId == req.body.emailId) {
          asset.intros[i].selected = false
        } else {
        }
      }
    }
    mongoUpdate('peloton', 'intros', {"_id": ObjectId(req.body.introId)}, { 'intros': asset.intros })
    res.send('done')
  });

module.exports = router;