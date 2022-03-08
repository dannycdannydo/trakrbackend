var express = require('express');
var router = express.Router();
const { mongoDelete } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')

router.post('/pelotonIntro/dbFunctions/deleteIntro', async function(req, res, next) {
    const id = req.body.data._id
    let container = 'intros'
    let db = 'peloton'
    const result = mongoDelete(db, container, id)
    res.send(result)
  });


module.exports = router;