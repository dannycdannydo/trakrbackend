var chargebee = require('chargebee');

async function getCustomerFromEmail (data) {
  chargebee.customer.list({
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

module.exports.getCustomerFromEmail = getCustomerFromEmail