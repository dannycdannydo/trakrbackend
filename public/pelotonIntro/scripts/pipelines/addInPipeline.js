const getMail = require('../../scripts/outlookApi/getMail')
const uploadFile = require('../../scripts/storage/uploadFile')
var mime = require('mime-types')
const mongoFunctions = require('../database/mongoFunctions')
const geocode = require('../../scripts/geography/geocode')
const pdfToJpg = require('../pdfWork/pdfToJpg')
const findAssetGroup = require('../analysis/findAssetGroup')


async function pipe(data){
    const mail = await getMail.getMail(data.restURL, data.itemId, data.token)
    let tempAdd = {}
    let asset = {}
    if(data.address){
        tempAdd = await geocode.geocode(data.address)
        if(tempAdd.status && tempAdd.status == "invalid"){
            return({result: 'fail', message: "Address not recognised, try again"})
        }
        else if(tempAdd.address.full) {
            data.address = tempAdd.address.full
        }
    }
    else {
        return({result: 'fail', message: "Address not recognised, try again"})
    }
    if(tempAdd.latitude){
        data.loc = { type: "Point", coordinates: [tempAdd.longitude, tempAdd.latitude] }
    }
    else {
        return({result: 'fail', message: "Address not recognised, try again"})
    }
    data.dateSent = mail.date
    data.attachments = []
    data.filename = data.itemId
    for(var a in mail.attachments){
        if(mail.attachments[a].contentDisposition == "attachment"){
            let fileExtension = mime.extension(mail.attachments[a].contentType);
            data.attachments.push({name: mail.attachments[a].filename, filename: data.filename + a, extension: fileExtension})
            uploadFile.uploadFile(mail.attachments[a].content, data.filename + a, 'peloton', "." + fileExtension)
            if (fileExtension.includes("pdf")) {
                const img = await pdfToJpg.pdfToJpg(mail.attachments[a].content, data.filename + a)
                uploadFile.uploadFile(img, data.filename + a, 'peloton', ".jpg")
            }
        }
    }
    data.recipient = mail.to.value
    data.html = mail.html
    const keys = ['address', 'dateSent', 'loc', 'attachments', 'pots', 'price', 'rent', 'yield', 'sectors']
    for(var k in keys){
        if(data[keys[k]]){
            asset[keys[k]] = data[keys[k]]
        }
    }
    delete data.token
    delete data.restURL
    //query DB to see if assets within +-30 days and 100m radius have been uploaded recently. Assume same asset if so.
    const groupCheck = await findAssetGroup.findAssetGroup(data)
    // There is already this asset in DB, so just update the intro key for that asset.
    if(groupCheck[0]){
        const result = await mongoFunctions.mongoUpdate('peloton', 'intros', {"_id" : groupCheck[1]._id.toString()}, { "$push": { "intros": data }} )
    }
    // or, create a new asset based on this intros details.
    else{
        mongoFunctions.mongoInsert('peloton', 'intros', {asset: asset, intros: [data]})
    }
    return('true')
}

module.exports.pipe = pipe