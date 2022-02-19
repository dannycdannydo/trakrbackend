const axios = require('axios')
const simpleParser = require('mailparser').simpleParser;

async function getMail(restURL, itemId, token) {
  const requestURL = restURL + '/v2.0/me/messages/' + itemId + '/$value'
  let mail =  await axios.get(
      requestURL,
      {
        headers: {
          'Authorization': `Bearer ` + token,
        }
      }
    );
    mail = await simpleParser(mail.data)
    return mail
  }

async function getMimeContent(mail) { 
  const mimeContent = mail.slice(mail.toLowerCase().indexOf("mime-version"), mail.length)
  return(mimeContent)
}
    

module.exports.getMail = getMail