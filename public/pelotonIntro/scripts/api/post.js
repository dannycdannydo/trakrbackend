const axios = require('axios')
const FormData = require('form-data')

async function post (frontUrl, endpoint, data) {
    if (process.env.NODE_ENV === 'development') {
        frontUrl = 'http://localhost:5000'
    }
    const url = `${frontUrl}${endpoint}`
    let returndata = {}
    await axios.post(url, data)
    .then(async response => {
        returndata = response
    })
    .catch((error) => {
        return (error)
    })
    return returndata
}

async function postFile(frontUrl, endpoint, data, file, filename) {
    if (process.env.NODE_ENV === 'development') {
        frontUrl = 'http://localhost:5000'
    }
    // var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
    //     frequency: 10,   // in milliseconds.
    //     chunkSize: 2048  // in bytes.
    // });
    // myReadableStreamBuffer.put(file.buffer);
    const url = `${frontUrl}${endpoint}`
    let returndata = {}
    var bodyFormData = new FormData();
    for (const [key, value] of Object.entries(data)){
        bodyFormData.append(key, value)
    }
    bodyFormData.append('file', file.buffer, {filename: filename})
    await axios({
        method: "post",
        url: url,
        data: bodyFormData,
        headers: bodyFormData.getHeaders(),
        'maxContentLength': Infinity,
        'maxBodyLength': Infinity,
    })
    .then(function (response) {
        //handle success
        returndata = response;
    })
    .catch(function (response) {
        //handle error
    });
    return returndata
}

module.exports.post = post
module.exports.postFile = postFile
