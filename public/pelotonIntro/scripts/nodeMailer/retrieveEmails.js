const simpleParser = require('mailparser').simpleParser;
var imaps = require('imap-simple');
// simpleParser(source, options, (err, parsed) => {});

var config = {
    imap: {
        user: 'pelotonintros@outlook.com',
        password: 'NOkell1!',
        host: 'outlook.office365.com',
        port: 993,
        tls: {
          secureProtocol: "TLSv1_method"
      },
        tlsOptions: { rejectUnauthorized: false },
        markSeen: true,
    fetchUnreadOnStart: true,
    }
};

async function getEmails(){
    return new Promise(async function(resolve, reject)
    {
        try{
            let connection = await imaps.connect(config)
            await connection.openBox('INBOX')
            var searchCriteria = ['UNSEEN'];
            var fetchOptions = {
                bodies: ['HEADER', 'TEXT', ''],
                markSeen:true
            };
            let messages = await connection.search(searchCriteria, fetchOptions)
            resolve(messages)
        }
        catch{
            reject('failed here')
        }
    });
}


module.exports.getEmails = getEmails