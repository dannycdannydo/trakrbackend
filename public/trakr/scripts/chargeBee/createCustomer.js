var chargebee = require('chargebee');

let createCustomer = async function createCustomer(data)
{
  return new Promise(async function(resolve, reject)
  {
    chargebee.customer.create({
        // first_name : "John",
        // last_name : "Doe",
        email : data.email,
        // locale : "fr-CA",
        // billing_address : {
        //     first_name : "John",
        //     last_name : "Doe",
        //     line1 : "PO Box 9999",
        //     city : "Walnut",
        //     state : "California",S
        //     zip : "91789",
        //     country : "US"
        //     }
        meta_data: {
            "auth0Id": data.user_id
        }
        }).request(function(error,result) {
        if(error){
            //handle error
            resolve(error);
        }else{
            console.log(result)
            resolve(result)
        }
        });
    })
}

module.exports.createCustomer = createCustomer