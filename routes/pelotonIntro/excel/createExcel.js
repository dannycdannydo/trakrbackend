var express = require('express');
var router = express.Router();
const { createExcel } = require('../../../public/pelotonIntro/scripts/excel/createExcel')
const { introQueryMongoliser, mongoQuery } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')

router.post('/pelotonIntro/excel/createExcel', async function(req, res, next) {
    try {
        req.body.data = await listToIntros(req.body.data)
        const buffer = await createExcel(req.body.data, req.body.template, req.body.sheetname)
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=${req.body.filename}.xlsx`);
        res.send(buffer.toString('base64'))
    } catch {
        res.send(false)
    }
});

async function listToIntros (list) {
    if (list) {
        try {
            const ids = { _id: [] }
            for (var l in list) {
                ids._id.push(list[l].id)
            }
            const query = await introQueryMongoliser(ids)
            const results = await mongoQuery('peloton', 'intros', query, 100000000, {'asset.dateSent': -1}  )
            return results
        } catch {
            return false
        }
    } else {
        return false
    }
}

module.exports = router;