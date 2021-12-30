var express = require('express');
var router = express.Router();
var axios = require("axios").default;


router.post('/trakr/auth/addMetaData', async function(req, res, next) {
    var options = {
        method: 'PATCH',
        url: 'https://dev--gfk8fe3.eu.auth0.com/api/v2/users/user_id',
        headers: {authorization: 'Bearer ABCD', 'content-type': 'application/json'},
        data: {user_metadata: {customer: req.body}}
      };
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
});

module.exports = router;