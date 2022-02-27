var express = require('express');
var router = express.Router();
const { mongoQuery, introQueryMongoliser } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')

router.post('/pelotonIntro/dbFunctions/introSearch', async function(req, res, next) {
    console.log(req.body.query)
    for(const [key, value] of Object.entries(req.body.query)) {
      if(key.toLowerCase().includes('date')){
        if(typeof value == "object"){
          for(let [key, valueTwo] of Object.entries(value)) {
            value[key] = new Date(valueTwo)
          }
        }
      }
    }
    if (!req.body.freq) {
      req.body.freq = 100
    }
    if (!req.body.sort) {
      req.body.sort = {"asset.dateSent": -1}
    }
    const query = await introQueryMongoliser(req.body.query)
    const result = await mongoQuery('peloton', 'intros', query, req.body.freq, req.body.sort)
    console.log(result)
    res.send(result)
  });


module.exports = router;