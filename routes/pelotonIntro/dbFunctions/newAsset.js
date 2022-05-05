var express = require('express');
var router = express.Router();
const { mongoInsert, mongoUpdatePush } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')
const numbers = ['price', 'rent', 'yield']
const dates = ['dateSent']
var multer  = require('multer')
var upload = multer({ })
const { getAttachmentNames } = require('../../../public/pelotonIntro/scripts/analysis/emailAnalysis')
const { uploadFile } = require('../../../public/pelotonIntro/scripts/storage/uploadFile')
const { pdfToJpg } = require('../../../public/pelotonIntro/scripts/pdfWork/pdfToJpg')
var mime = require('mime-types');
const { keyBy } = require('lodash');
const { UsernamePasswordCredential } = require('@azure/identity');
const { trakrDBConnectionString } = require('../../../config/env/production');
const { findAssetGroup } = require('../../../public/pelotonIntro/scripts/analysis/findAssetGroup');
const userName = { 'nick@pelotonre.co.uk': 'Nick Okell', 'david@pelotonre.co.uk': 'Dave Tyson', 'jonny@pelotonre.co.uk': 'Jonny Nuttall', 'emily@pelotonre.co.uk': 'Emily Speak', 'daniel@trakr.it': 'Nick Okell' }

router.post('/pelotonIntro/dbFunctions/newAsset', async function(req, res, next) {
  let data = req.body.data
  data.asset.dateSent = new Date
  for (var [key, value] of Object.entries(data.asset)) {
    data.intros[0][key] = value
    if(numbers.includes(key)) {
      data.asset[key] = value * 1
    }
  }
  data.intros[0].body = 'Manual Upload'
  data.intros[0].html = htmlString
  data.intros[0].recipient = [{address: data.user, name: userName[data.user.toLowerCase()] }]
  data.intros[0].itemId = makeid(15) + (new Date).toISOString()
  data.intros[0].subject = data.asset.address[0]
  delete data.user
  const groupCheck = await findAssetGroup(data.asset)
  if(groupCheck[0]){
    await mongoUpdatePush('peloton', 'intros', {"_id" : groupCheck[1]._id.toString()}, { "intros": data.intros[0] } )
    res.send({status: 'success', message: 'It looks like this asset has already been introduced resently. This agents intro was added to the asset profile.'})
  }
  // or, create a new asset based on this intros details. Also set into as selected one.
  else{
    data.intros[0].selected = true
    await mongoInsert('peloton', 'intros', data)
    res.send({status: 'success', message: 'Your asset and agent intro was uploaded succesfully.'})
  }
});

router.post('/pelotonIntro/dbFunctions/newAssetFile', upload.single('file'), async function(req, res, next) {
  const file = req.file
  const data = JSON.parse(req.body.data)
  console.log(data)
  // const result = await mongoUpdate('peloton', 'intros', req.body.filter, query)
  // uploadFile(file.buffer, req.body.fileName, 'peloton', "." + mime.extension(file.mimetype))
  // if (mime.extension(file.mimetype).includes("pdf")) {
  //     const img = await pdfToJpg(file.buffer, req.body.fileName)
  //     uploadFile(img, req.body.fileName, 'peloton', ".jpg")
  // }
  res.send('result')
});

const htmlString = '<!DOCTYPE html> <html> <head> <!-- HTML Codes by Quackit.com --> <title> </title> <meta name="viewport" content="width=device-width, initial-scale=1"> <style> body {background-color:#ffffff;background-repeat:no-repeat;background-position:top left;background-attachment:fixed;} h1{font-family:Arial, sans-serif;color:#000000;background-color:#ffffff;} p {font-family:Georgia, serif;font-size:14px;font-style:normal;font-weight:normal;color:#000000;background-color:#ffffff;} </style> </head> <body> <h1></h1> <p>This intro was manually uploaded and has no email thread. </p> </body> </html>'

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

module.exports = router;