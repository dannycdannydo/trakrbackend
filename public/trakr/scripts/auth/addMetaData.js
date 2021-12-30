var axios = require("axios").default;

let addMetaData = async function addMetaData(data)
{
  return new Promise(async function(resolve, reject)
  {
    var options = {
        method: 'PATCH',
        url: 'https://dev--gfk8fe3.eu.auth0.com/api/v2/users/user_id',
        headers: {authorization: 'Bearer ABCD', 'content-type': 'application/json'},
        data: {user_metadata: {customer: data}}
      };
      axios.request(options).then(function (response) {
        console.log(response.data);
        resolve(response.data)
      }).catch(function (error) {
        console.error(error);
      });
    })
}

module.exports.addMetaData = addMetaData