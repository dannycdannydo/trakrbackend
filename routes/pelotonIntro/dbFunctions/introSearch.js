var express = require('express');
var router = express.Router();
const { mongoQuery, introQueryMongoliser } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')
const { introSums } = require('../../../public/pelotonIntro/scripts/sums/introSums')

router.post('/pelotonIntro/dbFunctions/introSearch', async function(req, res, next) {
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
    const sums = await introSums(result)
    if (req.body.sumsOnly) {
      res.send({ sums: sums })
    } else if (req.body.basic) {
      for (var r in result) {
        for (var i in result[r].intros) {
          result[r].intros[i] = { itemId: result[r].intros[i].itemId }
        }
      }
      res.send({data: result})
    } else {
      res.send({data: result, sums: sums})
    }
  });


module.exports = router;