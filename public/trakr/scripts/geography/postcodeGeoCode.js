
// uses google geocoding to search for address
const postcodeGeoCode = async function postcodeGeoCode (pcode) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async function (resolve, reject) {
        const url = `https://api.postcodes.io/postcodes/${pcode}`
        const axios = require('axios')
        const result = { status: 'valid', latitude: null, longitude: null }
        try {
            await axios.get(url)
            .then(async response => {
                // eslint-disable-next-line no-lone-blocks
                {
                    if (response.status === 200 && response.statusText === 'OK') {
                        result.latitude = response.data.result.latitude
                        result.longitude = response.data.result.longitude
                    } else {
                        result.status = 'invalid'
                    }
                    console.log(result)
                    resolve(result)
                }
            })
        } catch {
            result.status = 'invalid'
            resolve(result)
        }
    })
}

module.exports.postcodeGeoCode = postcodeGeoCode
