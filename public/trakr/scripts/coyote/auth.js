let getGraphToken = async function getGraphToken(accessToken)
{
    return new Promise(async function(resolve, reject)
    {
        var request = require('request');
        var options = {
            'method': 'GET',
            'url': 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: {
            'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'client_id': '5d9378c5-4dd8-4ec5-a914-b72bd928ad28',
            'client_secret': 'Sjt8Q~TLSK6VZNfzJh7_RAU5HWkj7F1EZNwYXc1v',
            'scope': ['Mail.Send'].join(' '),
            'assertion': accessToken,
            'requested_token_use': 'on_behalf_of'
            }
        };
        request(options, function (error, response) {
            console.log(error)
            if (error) throw new Error(error);
            resolve(response.body)
        });
    })
}

module.exports.getGraphToken = getGraphToken