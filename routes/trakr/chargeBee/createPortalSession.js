var express = require('express');
var router = express.Router();
const { createPortalSession } = require('../../../public/trakr/scripts/chargeBee/createPortalSession')



router.post('/trakr/chargeBee/createPortalSession', async function(req, res, next) {
  const session = await createPortalSession(req.body)
  res.send(session)
});

module.exports = router;