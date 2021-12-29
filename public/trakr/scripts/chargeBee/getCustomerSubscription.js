var chargebee = require('chargebee');

let getCustomerSubscription = async function getCustomerSubscription(data)
{
  return new Promise(async function(resolve, reject)
  {
    if(!data.email){
      resolve({subscription: {status: false}})
    }
    chargebee.subscription.list({
      "email[is]" : data.email
    }).request(function(error,result) {
      if(error){
        //handle error
        reject(error)
      }else{
          console.log(result.list[0])
          resolve(result.list[0])
        }
      });
    })
  }

module.exports.getCustomerSubscription = getCustomerSubscription