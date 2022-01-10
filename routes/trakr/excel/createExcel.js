var express = require('express');
var router = express.Router();
const { createExcel } = require('../../../public/trakr/scripts/excel/createExcel')


router.post('/trakr/excel/createExcel', async function(req, res, next) {
    const buffer = await createExcel(req.body.data, req.body.template, req.body.sheetname)
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=${req.body.filename}.xlsx`);
    res.send(buffer.toString('base64'))
});

module.exports = router;