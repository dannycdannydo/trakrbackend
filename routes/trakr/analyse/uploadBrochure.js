var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ })
const fullProcess = require('../../../public/trakr/scripts/analyse/fullProcess')
const { getOrganisations } = require('../../../public/trakr/scripts/auth/getOrganisations')

router.post('/trakr/analyse/brochureUpload', upload.single('file'), async function(req, res, next) {
    res.setTimeout(10000, () => 
        res.send({ succeeded: 1, dupes: 0, fails: 0 })
    );
    const file = req.file
    const uploaderEmail = req.headers.uploaderemail
    const organisations = await getOrganisations(req.headers.uploaderid)
    const result = await fullProcess.fullProcess(file, uploaderEmail, organisations)
    if (!res.headersSent) {
        res.send(result)
    }
});

module.exports = router;