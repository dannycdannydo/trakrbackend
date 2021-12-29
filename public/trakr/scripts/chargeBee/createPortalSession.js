var chargebee = require('chargebee');

async function createPortalSession (data) {
    chargebee.portal_session.create({
        redirect_url : "https://trakr.com/",
        customer : {
          id : data.customer_id
          }
      }).request(function(error,result) {
        if(error){
          //handle error
          console.log(error);
          return error
        }else{
          var portal_session = result.portal_session;
          return portal_session
        }
      });
}

module.exports.createPortalSession = createPortalSession