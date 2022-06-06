const { graphConfig } = require("./authConfig")
const axios = require('axios')
const data = {
    "comment": "comment-value",
    "toRecipients": [
        {
            "emailAddress": {
                "name": 'Daniel Campbell',
                "address": 'daniel@trakr.it'
            }
        }
    ]
  }

async function forwardEmail(graphToken, userEmail, emailID, info) {
    let returndata = {}
    if(info) {
        data.comment = info
    }
    await axios.post(graphConfig.forwardEmail.replace('userID', userEmail).replace('emailID', emailID), data, { headers: {
        'Authorization': `Bearer ${graphToken}`, 'Content-Type': 'application/json'}
      })
    .then(async response => {
        returndata = response
    })
    .catch((error) => {
        console.log(error)
        return (error)
    })
    return returndata
}

async function getUser(graphToken, userEmail, emailID) {
    let returndata = {}
    await axios.get(graphConfig.getUser.replace('userEmail', userEmail), data, { headers: {
        'Authorization': `Bearer ${graphToken}`, 'Content-Type': 'application/json'}
      })
    .then(async response => {
        returndata = response
    })
    .catch((error) => {
        console.log(error)
        return (error)
    })
    return returndata
}

module.exports.forwardEmail = forwardEmail
module.exports.getUser = getUser