var chargebee = require('chargebee');

async function getCustomerSubscription (data) {
  if(!data.email){
    res.send({subscription: {status: false}})
  }
  chargebee.subscription.list({
    "email[is]" : data.email
  }).request(function(error,result) {
    if(error){
      //handle error
      return error
    }else{
        return result.list[0]
      }
    });
}

module.exports.getCustomerSubscription = getCustomerSubscription