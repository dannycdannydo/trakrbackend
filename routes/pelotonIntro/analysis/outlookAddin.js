var express = require('express');
var router = express.Router();
const addInPipeline = require('../../../public/pelotonIntro/scripts/pipelines/addInPipeline');

router.post('/pelotonIntro/analysis/outlookAddin', async function(req, res, next) {
  const analysis = await addInPipeline.pipe(req.body)
  res.send(analysis)
})

module.exports = router;