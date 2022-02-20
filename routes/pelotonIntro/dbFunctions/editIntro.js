var express = require('express');
var router = express.Router();
const { mongoUpdate } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')
const numbers = ['price', 'rent', 'yield']

router.post('/pelotonIntro/dbFunctions/editIntro', async function(req, res, next) {
    console.log(req.body)
    const query = {}
    if (req.body.data) {
      for (const [key] of Object.entries(req.body.data)) {
        for (let [k, v] of Object.entries(req.body.data[key])) {
          if (numbers.includes(k)) {
            v = v.replace(/[^0-9\.]/g,'');
            v = v * 1
          }
          query[`${key}.${k}`] = v
        }
      }
    }
    console.log(query)
    const result = await mongoUpdate('peloton', 'intros', req.body.filter, query)
    res.send('hello')
  });


module.exports = router;