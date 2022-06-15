const moment = require('moment')
const _ = require('lodash')
const { mongoInsert } = require('../db/mongoFunctions')
const { uploadFile } = require('../storage/uploadToStorage')
const getText = require('../pdf/ExtractText')
// const { getAgency, getDescription, getFilename, getLocation, getPrice, getSector, getSubSector, getTenants, getYield } = require('./datapointAlgos')
const algos = ['getSector', 'getSubSector', 'getPrice', 'getRent', 'getYield', 'getAgency']
const getLocation = require('../analyse/datapointAlgos/getLocation')
const getTenants = require('../analyse/datapointAlgos/getTenants')
const getFilename = require('../analyse/datapointAlgos/getFilename')
const finalForm = {
    base: {
        portfolio: null,
        loc: { type: null, coordinates: null },
        filename: null,
        town: null,
        region: null,
        postcode: null,
    },
    meta: {
        dateCreated: null,
        dateAdded: moment().format(),
        uploader: 'Trakr',
        filetype: null,
        manualUpload: 0,
    },
    sectors: [],
    subsectors: [],
    figures: {
        rent: null,
        price: null,
        yield: null,
    },
    agencies: [],
    tenants: [],
}

async function fullProcess(file, uploader, orgs)
{
    return new Promise (async function(resolve, reject)
    {
        let result = null
        try{
            result = await fullProcessRun(file, uploader, orgs)
        } catch (err) {
            if (!file.originalname) {
                file.originalname = moment()
            }
            await uploadFile(file.buffer, moment(), 'testcontainerfail', file.originalname, finalForm.meta.filetype)
            resolve( { succeeded:uniqueFiles, dupes: dupeFiles, fails: fails })
        }
        resolve(result)
    })
}

async function fullProcessRun(file, uploader, orgs)
{
    return new Promise (async function(resolve, reject)
    {
        try {
            const finalForm = {
                base: {
                    portfolio: null,
                    loc: { type: null, coordinates: null },
                    filename: null,
                    town: null,
                    region: null,
                    postcode: null,
                },
                meta: {
                    dateCreated: null,
                    dateAdded: moment().format(),
                    uploader: 'Trakr',
                    filetype: null,
                    manualUpload: 0,
                },
                sectors: [],
                subsectors: [],
                figures: {
                    rent: null,
                    price: null,
                    yield: null,
                },
                agencies: [],
                tenants: [],
            }
            let uniqueFiles = 0
            let dupeFiles = 0
            let fails = 0
            let pdfData = {}
            await getText.getText(file.buffer).then(function (result) {
                pdfData = result
            })
            .catch(async function (err) {
                if (!file.originalname) {
                    file.originalname = moment()
                }
                await uploadFile(file.buffer, finalForm.base.filename, 'testcontainerfail', file.originalname, finalForm.meta.filetype)
                fails++
                resolve( { succeeded:uniqueFiles, dupes: dupeFiles, fails: fails })
            })
            finalForm.meta.dateCreated = pdfData.date
            finalForm.meta.dateAdded = moment().format()
            finalForm.meta.filetype = file.mimetype
            finalForm.meta.manualUpload = 0
            if (uploader) {
                finalForm.meta.uploader = uploader
            }
            //most form entry can be filled out by looping through required js files.
            for (var a in algos) {
                const script  = require(`./datapointAlgos/${algos[a]}.js`)
                await script[algos[a]](pdfData.sentences, pdfData.text).then(function (result) {
                    if (result.name.length === 2) {
                        finalForm[result.name[0]][result.name[1]] = result.data
                    } else if (result.name.length === 1) {
                        finalForm[result.name[0]] = result.data
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
            }
            //location is a bit more tricky. 
            if(finalForm.sectors[0] && finalForm.sectors[0].sector == "Portfolio"){
                finalForm.base = { portfolio: '1' }
                await getLocation.getLocationPortfolio(pdfData.sentences, pdfData.text).then(function (result) {
                    finalForm.base.address = result
                })
                .catch(function (err) {
                    console.log(err)
                })
            }
            else{
                finalForm.base.portfolio = '0'
                await getLocation.getLocation(pdfData.sentences, pdfData.text).then(function (result) {
                    for (const [key, value] of Object.entries(result)) {
                        finalForm.base[key] = value
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
            }
            await getTenants.getTenants(pdfData.text, finalForm.agencies).then(function (result) {
                finalForm.tenants = result
            })
            .catch(function (err) {
                console.log(err)
            })
            await getFilename.getFilename(finalForm, pdfData.text.replace(/\W/g, '')).then(function (result) {
                finalForm.base.filename = result
            })
            .catch(function (err) {
                console.log(err)
            })
            let database = 'trakr'
            let collection = 'brochures'
            if (!uploader.includes('@trakr.it')) {
                database = 'userUploads'
                collection = uploader
                finalForm.meta.userUpload = true
            }
            let fileCount = await insertToDatabase(finalForm, database, collection, uniqueFiles, dupeFiles)
            uniqueFiles = fileCount.uniqueFiles
            dupeFiles = fileCount.dupeFiles
            if (orgs[0]) {
                for (var o in orgs) {
                    database = 'orgUploads'
                    collection = orgs[o]
                    finalForm.meta.orgUpload = true
                    insertToDatabase(finalForm, database, collection, uniqueFiles, dupeFiles)
                }
            }
            let container = 'trakrbrochures'
            if(finalForm.base && finalForm.base.portfolio == '1'){
                if(!finalForm.base.address){
                    container = "failed"
                    fails++
                }
            }
            else if(!finalForm.sectors || !finalForm.sectors[0] || !finalForm.base.loc || !finalForm.base.loc.coordinates || !finalForm.base.loc.coordinates[0]){
                container = "failed"
                fails++
            }
            await uploadFile(file.buffer, finalForm.base.filename, container, file.originalname, finalForm.meta.filetype)
            resolve( { succeeded:uniqueFiles, dupes: dupeFiles, fails: fails })
        } catch {
            resolve( { succeeded:0, dupes: 0, fails: 1 })
        }
    })
}

async function insertToDatabase (finalForm, database, collection, uniqueFiles, dupeFiles) {
    try {
        if(finalForm.base.portfolio == "0" && finalForm.sectors && finalForm.sectors[0] && finalForm.base.loc && finalForm.base.loc.coordinates && finalForm.base.loc.coordinates[0]){
            const res = await mongoInsert(database, collection, finalForm)
            if (res === 'Success') {
                uniqueFiles++
            } else if (res === 'Duplicate') {
                dupeFiles++
            }
        }
        else if (finalForm.base.portfolio == "1"){
            let portfolioForms = []
            let count = 0
            if (finalForm.base.address) {
                for(var a in finalForm.base.address){
                    let tempform = _.cloneDeep(finalForm)
                    tempform.base.town = finalForm.base.address[a].town
                    tempform.base.region = finalForm.base.address[a].region
                    tempform.base.postcode = finalForm.base.address[a].postcode
                    tempform.base.loc = { type: "Point", coordinates: [finalForm.base.address[a].longitude, finalForm.base.address[a].latitude] }
                    tempform.base.filename = finalForm.base.filename + "portcount" + count
                    delete tempform.base.address
                    count++
                    portfolioForms.push(tempform)
                }
                for(var form in portfolioForms){
                    const res = await mongoInsert(database, uploader, portfolioForms[form])
                    if (res === 'Success') {
                        uniqueFiles++
                    } else if (res === 'Duplicate') {
                        dupeFiles++
                    }
                }
            }
        }
        return {uniqueFiles: uniqueFiles, dupeFiles: dupeFiles}
    } catch {
        return {uniqueFiles: 0, dupeFiles: 0}
    }
}


module.exports.fullProcess = fullProcess
module.exports.fullProcessRun = fullProcessRun