var axios = require("axios").default;
const { getToken } = require('./authManage')

let getUser = async function getUser(userId)
{
  return new Promise(async function(resolve, reject)
  {
    let token = await getToken()
    token = JSON.parse(token)
    var options = {
        method: 'GET',
        url: 'https://dev--gfk8fe3.eu.auth0.com/api/v2/users/' + userId,
        headers: {authorization: `${token.token_type} ${token.access_token}`, 'content-type': 'application/json'},
      };
      axios.request(options).then(function (response) {
        resolve(response.data)
      }).catch(function (error) {
      });
    })
}

module.exports.getUser = getUser