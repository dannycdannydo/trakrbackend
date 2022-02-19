const retrieveEmails = require('../nodeMailer/retrieveEmails')
const emailAnalysis = require('../analysis/emailAnalysis')


async function fullProcess(){
    return new Promise(async function(resolve, reject)
    {
        try{
            const emails = await retrieveEmails.getEmails()
            for(var email in emails){
                let result = await emailAnalysis.analyse(emails[email])
            }
        }
        catch{
        }
    });
}


module.exports.fullProcess = fullProcess