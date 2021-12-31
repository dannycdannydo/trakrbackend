var axios = require("axios").default;
const { getToken } = require('./authManage')

let updateMetaData = async function updateMetaData(data, userId)
{
  return new Promise(async function(resolve, reject)
  {
    const token = getToken()
    console.log(token)
    var options = {
        method: 'PATCH',
        url: 'https://dev--gfk8fe3.eu.auth0.com/api/v2/users/' + userId,
        headers: {authorization: `${token.token_type} ${token.access_token}`, 'content-type': 'application/json'},
        data: {user_metadata: {customer: data.customer}}
      };
      axios.request(options).then(function (response) {
        console.log(response.data);
        resolve(response.data)
      }).catch(function (error) {
        console.error(error);
      });
    })
}

module.exports.updateMetaData = updateMetaData