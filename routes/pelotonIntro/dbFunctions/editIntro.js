var express = require('express');
var router = express.Router();
const { mongoUpdate } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')
const numbers = ['price', 'rent', 'yield']
const dates = ['dateSent']
var multer  = require('multer')
var upload = multer({ })
const { getAttachmentNames } = require('../../../public/pelotonIntro/scripts/analysis/emailAnalysis')
const { uploadFile } = require('../../../public/pelotonIntro/scripts/storage/uploadFile')
const { pdfToJpg } = require('../../../public/pelotonIntro/scripts/pdfWork/pdfToJpg')
var mime = require('mime-types')

router.post('/pelotonIntro/dbFunctions/editIntro', async function(req, res, next) {
  const query = {}
  if (req.body.data) {
    for (const [key] of Object.entries(req.body.data)) {
      for (let [k, v] of Object.entries(req.body.data[key])) {
        if (numbers.includes(k)) {
          v = v.toString().replace(/[^0-9\.]/g,'');
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
  res.send(result)
});

router.post('/pelotonIntro/dbFunctions/editIntroFile', upload.single('file'), async function(req, res, next) {
  const file = req.file
  req.body.data = JSON.parse(req.body.data)
  req.body.filter = JSON.parse(req.body.filter)
  const query = {}
  if (req.body.data) {
    for (const [key] of Object.entries(req.body.data)) {
      for (let [k, v] of Object.entries(req.body.data[key])) {
        if (numbers.includes(k)) {
          v = v.toString().replace(/[^0-9\.]/g,'');
          v = v * 1
        }
        if (dates.includes(k)) {
          try {
            v = new Date(v)
          } catch {}
        }
        query[`${key}.${k}`] = v
      }
    }
  }
  const result = await mongoUpdate('peloton', 'intros', req.body.filter, query)
  uploadFile(file.buffer, req.body.fileName, 'peloton', "." + mime.extension(file.mimetype))
  if (mime.extension(file.mimetype).includes("pdf")) {
      const img = await pdfToJpg(file.buffer, req.body.fileName)
      uploadFile(img, req.body.fileName, 'peloton', ".jpg")
  }
  res.send(result)
});


module.exports = router;