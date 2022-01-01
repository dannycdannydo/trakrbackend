var chargebee = require('chargebee');
const { getCustomerFromEmail } = require('../../../../public/trakr/scripts/chargeBee/getCustomerFromEmail')


let createCheckoutNewSubscription = async function createCheckoutNewSubscription(data)
{
  return new Promise(async function(resolve, reject)
  {
    let customerObject = { phone: '+44' }
    if (data.id) {
      customerObject.id = data.id
    } else {
      let tempId = await getCustomerFromEmail({email: data.email})
      customerObject.id = tempId.customer.id
    }
    chargebee.hosted_page.checkout_new_for_items({
      redirect_url: 'http://localhost:8080',
      subscription_items : [
        {
          item_price_id : data.plan,
          quantity: 1,
        },
      ],
      customer: customerObject,
      billing_address: {
        country: 'GB'
      }
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