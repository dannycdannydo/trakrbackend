 
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  const loginRequest = {
   scopes: ["User.Read", "Mail.Send"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  const graphConfig = {
      forwardEmail: "https://graph.microsoft.com/v1.0/users/userID/messages/emailID/forward",
      getUser: "https://graph.microsoft.com/v1.0/users/userEmail"
  };

  module.exports.graphConfig = graphConfig