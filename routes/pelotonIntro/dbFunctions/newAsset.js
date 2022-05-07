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
  try {
    let data = req.body.data
    data.asset.dateSent = new Date
    if (!data.intros) {
      data.intros = []
    }
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
    if (data.asset.address && data.asset.address[0]) {
      data.intros[0].subject = data.asset.address[0]
    }
    delete data.user
    let groupCheck = [false]
    if (data.asset.coords && data.asset.coords[0] && data.asset.coords[0].loc) {
      groupCheck = await findAssetGroup(data.asset)
    }
    if(groupCheck[0]){
      await mongoUpdatePush('peloton', 'intros', {"_id" : groupCheck[1]._id.toString()}, { "intros": data.intros[0] } )
      res.send({status: 'success', message: 'It looks like this asset has already been introduced recently. This agents intro was added to the asset profile.'})
    }
    // or, create a new asset based on this intros details. Also set into as selected one.
    else{
      data.intros[0].selected = true
      await mongoInsert('peloton', 'intros', data)
      res.send({status: 'success', message: 'Your asset and agent intro was uploaded succesfully.'})
    }
  } catch {
    res.send({status: 'failed', message: 'Sorry. There was an issue in uploading your asset. Please try again later.'})
  }
});

router.post('/pelotonIntro/dbFunctions/newAssetFile', upload.array('file'), async function(req, res, next) {
  try {
    const files = req.files
    const data = JSON.parse(req.body.data)
    data.asset.dateSent = new Date
    if (!data.intros) {
      data.intros = []
    }
    for (var [key, value] of Object.entries(data.asset)) {
      data.intros[0][key] = value
      if(numbers.includes(key)) {
        data.asset[key] = (value.toString().replace(/\D/g,'')) * 1
      }
    }
    data.intros[0].body = 'Manual Upload'
    data.intros[0].html = htmlString
    data.intros[0].recipient = [{address: data.user, name: userName[data.user.toLowerCase()] }]
    data.intros[0].itemId = makeid(15) + (new Date).toISOString()
    data.intros[0].attachments = data.asset.attachments
    if (data.asset.address && data.asset.address[0]) {
      data.intros[0].subject = data.asset.address[0]
    }
    delete data.user
    let groupCheck = [false]
    if (data.asset.coords && data.asset.coords[0] && data.asset.coords[0].loc) {
      groupCheck = await findAssetGroup(data.asset)
    }
    if(groupCheck[0]){
      await mongoUpdatePush('peloton', 'intros', {"_id" : groupCheck[1]._id.toString()}, { "intros": data.intros[0] } )
      res.send({status: 'success', message: 'It looks like this asset has already been introduced recently. This agents intro was added to the asset profile.'})
    }
    // or, create a new asset based on this intros details. Also set into as selected one.
    else{
      data.intros[0].selected = true
      await mongoInsert('peloton', 'intros', data)
      res.send({status: 'success', message: 'Your asset and agent intro was uploaded succesfully.'})
    }
    for (var f in files) {
      uploadFile(files[f].buffer, req.body.fileName[f], 'peloton', "." + mime.extension(files[f].mimetype))
      if (mime.extension(files[f].mimetype).includes("pdf")) {
        const img = await pdfToJpg(files[f].buffer, req.body.fileName[f])
        uploadFile(img, req.body.fileName[f], 'peloton', ".jpg")
      }
    }
  } catch {
    res.send({status: 'failed', message: 'Sorry. There was an issue in uploading your asset. Please try again later.'})
  }
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