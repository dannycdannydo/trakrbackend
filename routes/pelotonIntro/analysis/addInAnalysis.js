var express = require('express');
var router = express.Router();
const addInAnalysisPipeline = require('../../../public/pelotonIntro/scripts/pipelines/addInAnalysisPipeline');

router.post('/pelotonIntro/analysis/addInAnalysis', async function(req, res, next) {
  const analysis = await addInAnalysisPipeline.pipe(req.body)
  res.send(analysis)
})

module.exports = router;