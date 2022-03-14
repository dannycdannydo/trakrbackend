var axios = require("axios").default;
const { getToken } = require('./authManage')

let getOrganisations = async function getOrganisations(userId)
{
  return new Promise(async function(resolve, reject)
  {
    let token = await getToken()
    token = JSON.parse(token)
    var options = {
        method: 'GET',
        url: `https://dev--gfk8fe3.eu.auth0.com/api/v2/users/${userId}/organizations`,
        headers: {authorization: `${token.token_type} ${token.access_token}`, 'content-type': 'application/json'},
      };
      axios.request(options).then(function (response) {
        const orgs = []
        if (response.data && response.data[0]) {
          for (var i in response.data) {
            orgs.push(response.data[i].id)
          }
        }
        resolve(orgs)
      }).catch(function (error) {
      });
    })
}

module.exports.getOrganisations = getOrganisations