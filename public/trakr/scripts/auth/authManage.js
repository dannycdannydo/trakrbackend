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

// let getApi = async function get_api(data, emailadd)
// {
//     return new Promise(async function(resolve, reject)
//         {
//             data = JSON.parse(data)
//             var apioptions = { method: 'GET',
//             url: 'https://dev--gfk8fe3.eu.auth0.com/api/v2/users-by-email',
//             qs: {email: emailadd},
//             headers: { authorization: `${data.token_type} ${data.access_token}`} };
//             request(apioptions, function (error, response, body) {
//             if (error) throw new Error(error);
//             resolve(JSON.parse(body)[0]);
//         })
//     })
// }

// let updateName = async function update_name(data, requestbody)
// {
//     return new Promise(async function(resolve, reject)
//         {
//             let id = requestbody.id
//             delete requestbody.id
//             delete requestbody.type
//             data = JSON.parse(data)
//             if(requestbody.number){
//               requestbody["user_metadata"] = {telephone: requestbody.number}
//               requestbody["app_metadata"] = {telephone: requestbody.number}
//               delete requestbody.number
//             }
//             if(requestbody.email){
//               requestbody["email_verified"] = false
//             }
//             var updateoptions = { method: 'PATCH',
//             url: `https://dev--gfk8fe3.eu.auth0.com/api/v2/users/${id}`,
//             headers: { authorization: `${data.token_type} ${data.access_token}`},
//             body: requestbody,
//             json: true
//             };
//             request(updateoptions, function (error, response, body) {
//               if (error){
//                 throw new Error(error);
//                 reject('Failed')
//               } 
//               if(requestbody.email){
//                 try{
//                   verifyemail(id,data.token_type,data.access_token)
//                 }
//                 catch{
//                   reject("Email Failure")
//                 }
//               }
//               resolve('Updated');
//           })
//     })
// }

// let resetPword = async function reset_pword(email)
// {
//   return new Promise(async function(resolve, reject)
//       {
//         var options = {
//           method: 'POST',
//           url: 'https://dev--gfk8fe3.eu.auth0.com/dbconnections/change_password',
//           headers: {'content-type': 'application/json'},
//           body: {
//             client_id: 'B553x3fjXLjKj5IX4WgbL8wSdh11g1St',
//             email: email,
//             connection: 'Username-Password-Authentication'
//           },
//           json: true
//         };
        
//         request(options, function (error, response, body) {
//           if (error){
//             throw new Error(error);
//             console.log(error)
//             reject('Failed')
//           }
//           else{
//             resolve("pword success")
//           }
//         });
//       })
//     }

// function verifyemail(id,token_type,access_token){
//   var updateoptions = { method: 'POST',
//       url: `https://dev--gfk8fe3.eu.auth0.com/api/v2/jobs/verification-email`,
//       headers: { authorization: `${token_type} ${access_token}`},
//       body: {user_id: id, client_id: "LP48c6v4MBVnwPBi5S3RO377umRA4ba3"},
//       json: true
//       };
//       request(updateoptions, function (error, response, body) {
//       if (error) throw new Error(error);
//   })
// }

module.exports.getToken = getToken