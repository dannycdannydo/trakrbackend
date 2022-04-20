var express = require('express');
var router = express.Router();
const { mongoDelete } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')
var ObjectId = require('mongodb').ObjectId; 

router.post('/pelotonIntro/dbFunctions/deleteIntro', async function(req, res, next) {
    const id = req.body.data._id
    let container = 'intros'
    let db = 'peloton'
    const result = mongoDelete(db, container, {"_id": ObjectId(id)})
    res.send(result)
  });


module.exports = router;