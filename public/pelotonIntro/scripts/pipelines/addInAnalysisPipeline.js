const getMail = require('../outlookApi/getMail')
const { matchAgency, getAttachmentNames, analyseEmail } = require('../analysis/emailAnalysis')
const trakrAnalysis = require('../../scripts/analysis/trakrAnalysis')

async function pipe(data){
    const email = await getMail.getMail(data.restURL, data.itemId, data.token)
    let analysis = {attachments: [], data:{}}
    let attachments = getAttachmentNames(email.attachments)
    analysis.attachments = attachments
    analysis.data = await trakrAnalysis.analyse(email.attachments, attachments)
    const emailTextAnalysis = await analyseEmail(email.text)
    for(const [key, value] of Object.entries(emailTextAnalysis)){
        if(!analysis.data[key] && value){
            analysis.data[key] = value
        }
    }
    analysis.data.agencies = []
    for(var i in data.agentEmails) {
        analysis.data.agencies.push(await matchAgency(data.agentEmails[i].toLowerCase()))
    }
    return(analysis)
}

module.exports.pipe = pipe