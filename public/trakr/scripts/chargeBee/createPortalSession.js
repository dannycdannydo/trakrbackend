var chargebee = require('chargebee');


let createPortalSession = async function createPortalSession(data)
{
  return new Promise(async function(resolve, reject)
  {
    chargebee.portal_session.create({
      customer : {
        id : data.customer_id
        }
    }).request(function(error,result) {
      if(error){
        //handle error
        resolve(error)
      }else{
        var portal_session = result.portal_session;
        resolve(portal_session)
      }
    })
  })
}

module.exports.createPortalSession = createPortalSession