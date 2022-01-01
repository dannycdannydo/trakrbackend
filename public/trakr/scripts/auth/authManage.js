var request = require("request");

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
              client_id: 'LP48c6v4MBVnwPBi5S3RO377umRA4ba3',
              client_secret: 'ZypNmP9E4s_jwPx5Bc9QM894qFQqCepdJJ465QD7Aak8J1qYm07Ldl7SneizfSZa',
              audience: 'https://dev--gfk8fe3.eu.auth0.com/api/v2/'
            }
          };
          request(options, async function (error, response, body) {
            resolve(body)
          });
    })
}

module.exports.getToken = getToken