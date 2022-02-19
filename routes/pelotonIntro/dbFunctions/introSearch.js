var express = require('express');
var router = express.Router();
const { mongoQuery } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')

router.post('/pelotonIntro/dbFunctions/introSearch', async function(req, res, next) {
    let query = req.body.query
    for(const [key, value] of Object.entries(query)) {
      if(key.toLowerCase().includes('date')){
        if(typeof value == "object"){
          for(let [key, valueTwo] of Object.entries(value)) {
            value[key] = new Date(valueTwo)
          }
        }
      }
    }
    const result = await mongoQuery('peloton', 'intros', req.body.query, req.body.freq, req.body.sort)
    res.send(result)
  });


module.exports = router;