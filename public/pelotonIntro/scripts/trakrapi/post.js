const axios = require('axios')
const fs = require('fs')
var FormData = require('form-data');
const { Readable } = require('stream');

async function post(endpoint, data){
    let url = `http://localhost:4000/api/${endpoint}`
    // let url = `https://brochuresearch.herokuapp.com/api/${endpoint}`
    let returndata = {}
    await axios.post(url, data)
    .then(async response => {
        returndata = response
    })
    .catch((error) => {
        throw error
    })
    return returndata
}


async function postFile(frontUrl, endpoint, sendfile){
    if (process.env.NODE_ENV === 'development') {
        frontUrl = 'http://localhost:5000/api/'
    }
    let url = `${frontUrl}${endpoint}`
    const form = new FormData();
    form.append("brochure", sendfile, 'someName')
    let returndata = {}
    await axios.post(url, form, {
        headers: {
          ...form.getHeaders(),
        },
      })
    .then(async response => {
        returndata = response.data
    })
    .catch((error) => {
    })
    return returndata
}


module.exports.post = post
module.exports.postFile = postFile 