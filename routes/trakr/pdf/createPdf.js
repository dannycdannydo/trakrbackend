var express = require('express');
var router = express.Router();
const { createExcel } = require('../../../public/trakr/scripts/excel/createExcel')


router.post('/trakr/pdf/createPdf', async function(req, res, next) {
    const buffer = await createExcel(req.body.data, req.body.template, req.body.sheetname, req.body.pdf)
    res.setHeader("Content-Type", 'application/pdf');
    res.setHeader("Content-Disposition", `attachment; filename=${req.body.filename}.pdf`);
    res.send(buffer.toString('base64'))
});

module.exports = router;