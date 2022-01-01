var chargebee = require('chargebee');

let getCustomerFromEmail = async function getCustomerFromEmail(data)
{
  return new Promise(async function(resolve, reject)
  {
    chargebee.customer.list({
      "email[is]" : data.email
    }).request(function(error,result) {
      if(error){
        //handle error
        console.log(error)
        resolve(error)
      }else{
          resolve(result.list[0])
        }
      });
    })
  }

module.exports.getCustomerFromEmail = getCustomerFromEmail