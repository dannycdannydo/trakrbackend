var chargebee = require('chargebee');


let createCheckoutNewSubscription = async function createCheckoutNewSubscription(data)
{
  return new Promise(async function(resolve, reject)
  {
    chargebee.hosted_page.checkout_new_for_items({
      subscription_items : [
        {
          item_price_id : data.plan,
          quantity: 1,
        },
      ]
    }).request(function(error,result) {
      if(error){
        //handle error
        console.log(error)
        resolve(error)
      }else{
        var hosted_page = result.hosted_page;
        resolve(hosted_page)
      }
    })
  })
}

module.exports.createCheckoutNewSubscription = createCheckoutNewSubscription