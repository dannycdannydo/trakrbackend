var axios = require("axios").default;
const { getToken } = require('./authManage')

let getUserFromEmail = async function getUserFromEmail(data)
{
  return new Promise(async function(resolve, reject)
  {
    console.log(data)
    // let token = await getToken()
    // console.log(token)
    // token = JSON.parse(token)
    var options = {
        method: 'GET',
        url: 'https://dev--gfk8fe3.eu.auth0.com/api/v2/users',
        params: {q: `email: "${data.email.toLowerCase()}" AND identities.connection:"Trakr2"`, search_engine: 'v3'},
        headers: {authorization: `Bearer ${data.token}`, 'content-type': 'application/json'},
      };
      axios.request(options).then(function (response) {
        resolve(response.data)
      }).catch(function (error) {
        console.log(error)
      });
    })
}

module.exports.getUserFromEmail = getUserFromEmail