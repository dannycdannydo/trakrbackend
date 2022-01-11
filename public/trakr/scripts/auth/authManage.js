var request = require("request");
var config = require('../../../../config/config')

let getToken = async function getToken()
{
    return new Promise(async function(resolve, reject)
    {
        var options = {
            method: 'POST',
            url: 'https://dev--gfk8fe3.eu.auth0.com/oauth/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            form: {
              grant_type: 'client_credentials',
              client_id: config.authClientId,
              client_secret: config.authClientSecret,
              audience: 'https://dev--gfk8fe3.eu.auth0.com/api/v2/'
            }
          };
          request(options, async function (error, response, body) {
            resolve(body)
          });
    })
}

module.exports.getToken = getToken