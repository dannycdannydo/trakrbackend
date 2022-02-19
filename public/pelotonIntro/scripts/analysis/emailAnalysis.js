const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');
const { mongoQuery } = require('../../scripts/database/mongoFunctions')
const geocode = require('../geography/geocode')
var natural = require('natural');
var tokenizer = new natural.WordPunctTokenizer();
const post = require('../api/post')
const priceWords = ["lot", "million", "asking", "price", "m", "pricing", "priced", "quoting", "excess", "offers"]
const rentWords = ["rent", "rental", "per", "annum", "pa", "passing"]
const yieldWords = ["net", "initial", "yield", "niy", "return", "price"]

async function analyse(email){
    return new Promise(async function(resolve, reject)
    {
        //define a template for the analysis result
        let result = {
            intro:{
                agencies:[],
                meta:{
                    date: new Date
                },
            },
            asset:{
            }
        }
        try{
            //parse the email to provide text, metadata etc..
            var all = _.find(email.parts, { "which": "" })
            var id = email.attributes.uid;
            var idHeader = "Imap-Id: "+id+"\r\n";
            let mail = await simpleParser(idHeader+all.body)
            mail.words = tokenizer.tokenize(mail.text)
            //sent the text to agency parser, returned as an array of objects
            result.intro.agencies = getAgency(mail.text.toLowerCase())
            //if date included in parsed email then set as the date.
            if(mail.date){
                result.intro.meta.date = mail.date
            }
            //ask trakr to parse any attachments that are of type PDF. 
            for(var a in mail.attachments){
                if(mail.attachments[a].contentType == "application/pdf"){
                    let trakrResponse = await post.postFile("https://brochuresearch.herokuapp.com/api/", "brochurefilesAPI", mail.attachments[a].content)
                    if(trakrResponse.base && (trakrResponse.base.portfolio == 1 || trakrResponse.base.loc.coordinates[0])){
                        result.asset = trakrResponse
                        break;
                    }
                }
            }
            //if nothing meaningful came out of trakr, analyse the email text
            if(Object.keys(result.asset).length === 0){
                const emailAnalysis = analyseEmail(mail)
            }
        }
        catch(err){
            console.log(err)
        }
        console.log(result)
        resolve(result)
    });
}


//small function that seraches for emails in the list of agencies to identify who introd it. 
//spits out an array of agancies with agency name and the senders email
async function getAgency(text){
    let agenciesReturn = []
    const agencies = await mongoQuery('lists', 'agencies', {}, 100000000)
    for(var i in agencies) {
        if(text.match(agencies[i].email)){
            var re = new RegExp(`(?<=<mailto:)(.*)(?=${agencies[key][a]})`);
            let email = text.match(re)[0] + agencies[key][a]
            agenciesReturn.push({agency: key, email: email})
        }
    }
    agenciesReturn.filter(onlyUnique)
    return(agenciesReturn)
}

//Get proper agency name and info from email address

async function matchAgency(email){
    const emailSuffix = email.slice(email.indexOf('@'), email.length)
    const agency = await mongoQuery('lists', 'agencies', {"emails": emailSuffix}, 100000000)
    if(agency[0]){
        return agency[0].agency
    }
    else {
        return null
    }
}

function getAttachmentNames(attachments) {
    attachmentNames = []
    for(var i in attachments){
        if(attachments[i].contentDisposition == "attachment") {
            attachmentNames.push(attachments[i].filename)
        }
    }
    return(attachmentNames)
}

//analyse the email text
async function analyseEmail(text){
    const words = text.toLowerCase().split(/\s+/)
    let wordBuffer = Number(5)
    const moneyPhrases = phraseMaker(words, "£", wordBuffer)
    const yieldPhrases = phraseMaker(words, "%", wordBuffer)
    const price = formatMoney(wordAnalysis(moneyPhrases, priceWords, wordBuffer))
    const rent = formatMoney(wordAnalysis(moneyPhrases, rentWords, wordBuffer))
    const yield = formatPercent(wordAnalysis(yieldPhrases, yieldWords, wordBuffer))
    return({price: price, rent: rent, yield: yield})
}


//reduce an array to unique values
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function wordAnalysis(phrases, words, buffer){
    const scores = []
    try{
        for (var p in phrases){
            scores[p] = Number(0)
            for (var i in words) {
                if(phrases[p].includes(words[i])) {
                    scores[p] = scores[p] + (buffer - Math.abs(phrases.indexOf(words[i])))
                }
            }
        }
        let index = scores.indexOf(Math.max(...scores));
        const result = phrases[index][buffer]
        return(result)
    }
    catch{
        return
    }
}

function phraseMaker(words, indicator, buffer) {
    const phrases = []
    for(var w in words){
        if(words[w].includes(indicator)){
            let phrase = []
            for(var i=-buffer; i < buffer+1; i++){
                try{
                    phrase.push(words[(w*1)+i])
                }
                catch{}
            }
            phrases.push(phrase)
        }
    }
    return(phrases)
}

function formatMoney (money) {
    try{
        let mill = false
        let thou = false
        if(money.includes("m") || money.includes("mill") || money.includes("million")) {
            mill = true
        }
        if(money.includes("k") || money.includes("thousand")) {
            thou = true
        }
        money = money.replace(/[^0-9.]/g, '')
        money = money * 1
        if(mill){
            money = money * 1000000
        }
        if(thou){
            money = money * 1000
        }
        return(money)
    }
    catch{
        return
    }
}

function formatPercent (percent) {
    try{
        percent = percent.replace(/[^0-9.]/g, '')
        percent = percent * 1
        return percent
    }
    catch{
        return
    }
}

module.exports.analyse = analyse
module.exports.getAgency = getAgency
module.exports.matchAgency = matchAgency
module.exports.getAttachmentNames = getAttachmentNames
module.exports.analyseEmail = analyseEmail