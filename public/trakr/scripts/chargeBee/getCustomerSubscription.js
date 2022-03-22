var chargebee = require('chargebee');

let getCustomerSubscription = async function getCustomerSubscription(data)
{
  return new Promise(async function(resolve, reject)
  {
    if(!data.id){
      resolve({subscription: {status: false}})
    }
    chargebee.subscription.list({
      "customer_id[is]" : data.id
    }).request(function(error,result) {
      if(error){
        //handle error
        reject(error)
      }else{
          if(result.list[0]) {
            resolve(result.list[0])
          }
          else {
            resolve({subscription: {status: false}})
          }
        }
      });
    })
  }

module.exports.getCustomerSubscription = getCustomerSubscription