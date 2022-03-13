var axios = require("axios").default;
const { getToken } = require('./authManage')

let updateMetaData = async function updateMetaData(objName, data, userId)
{
  return new Promise(async function(resolve, reject)
  {
    let token = await getToken()
    token = JSON.parse(token)
    var options = {
        method: 'PATCH',
        url: 'https://dev--gfk8fe3.eu.auth0.com/api/v2/users/' + userId,
        headers: {authorization: `${token.token_type} ${token.access_token}`, 'content-type': 'application/json'},
        data: {user_metadata: {objName: data}}
      };
      axios.request(options).then(function (response) {
        resolve(response.data)
      }).catch(function (error) {
        console.error(error);
      });
    })
}

module.exports.updateMetaData = updateMetaData