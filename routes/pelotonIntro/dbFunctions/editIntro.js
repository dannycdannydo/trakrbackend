var express = require('express');
var router = express.Router();
const { mongoUpdate } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')
const numbers = ['price', 'rent', 'yield']
const dates = ['dateSent']
var multer  = require('multer')
var upload = multer({ })
const { getAttachmentNames } = require('../../../public/pelotonIntro/scripts/analysis/emailAnalysis')

router.post('/pelotonIntro/dbFunctions/editIntro', async function(req, res, next) {
  const query = {}
  if (req.body.data) {
    for (const [key] of Object.entries(req.body.data)) {
      for (let [k, v] of Object.entries(req.body.data[key])) {
        if (numbers.includes(k)) {
          v = v.replace(/[^0-9\.]/g,'');
          v = v * 1
        }
        if (dates.includes(k)) {
          try {
            v = new Date(v)
          } catch {}
        }
        if(k == 'attachments') {
          delete req.body.data.asset.attachments
        }
        query[`${key}.${k}`] = v
      }
    }
  }
  const result = await mongoUpdate('peloton', 'intros', req.body.filter, query)
  res.send('hello')
});

router.post('/pelotonIntro/dbFunctions/editIntroFile', upload.single('file'), async function(req, res, next) {
  const file = req.file
  const data = JSON.parse(req.body.data)
    // const query = {}
    // if (req.body.data) {
    //   for (const [key] of Object.entries(req.body.data)) {
    //     for (let [k, v] of Object.entries(req.body.data[key])) {
    //       if (numbers.includes(k)) {
    //         v = v.replace(/[^0-9\.]/g,'');
    //         v = v * 1
    //       }
    //       if (dates.includes(k)) {
    //         try {
    //           v = new Date(v)
    //         } catch {}
    //       }
    //       query[`${key}.${k}`] = v
    //     }
    //   }
    // }
    // const result = await mongoUpdate('peloton', 'intros', req.body.filter, query)
    res.send('hello')
  });


module.exports = router;