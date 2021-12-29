var chargebee = require('chargebee');

async function createCustomer (data) {
    console.log(data)
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
        console.log(error);
    }else{
        console.log(result)
        return(result)
    }
    });
}

module.exports.createCustomer = createCustomer