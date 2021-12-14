var express = require('express');
var router = express.Router();
const { brochureQueryProcess } = require('../../public/processes/dbProcesses')

/* GET home page. */
router.post('/brochureQuery', async function(req, res, next) {
  console.log(req.body)
  const result = await brochureQueryProcess(req.body)
  res.send(result)
});


module.exports = router;
