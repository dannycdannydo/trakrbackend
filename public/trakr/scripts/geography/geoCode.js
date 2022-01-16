const config = require('../../../../config/config')

// uses google geocoding to search for address
const geocode = async function geocode (address) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async function (resolve, reject) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.gmapApiKey}`
        const axios = require('axios')
        const result = { status: 'valid', latitude: null, longitude: null, address: { postcode: null, town: null, region: null } }
        try {
            await axios.get(url)
            .then(async response => {
                // eslint-disable-next-line no-lone-blocks
                {
                    try {
                        // eslint-disable-next-line eqeqeq
                        if (response.status == 200 && response.data.status == 'OK') {
                            const add = response.data.results[0].address_components
                            if (response.data.results[0].formatted_address) {
                                result.address.full = response.data.results[0].formatted_address
                            }
                            for (var a in add) {
                                if (add[a].types.includes('postal_code')) {
                                    result.address.postcode = add[a].long_name
                                }
                                if (add[a].types.includes('administrative_area_level_2')) {
                                    result.address.region = add[a].long_name
                                }
                                if (add[a].types.includes('postal_town') || add[a].types.includes('locality')) {
                                    result.address.town = add[a].long_name
                                }
                                // eslint-disable-next-line eqeqeq
                                if (add[a].types.includes('country') && add[a].short_name != 'GB') {
                                    result.status = 'invalid'
                                }
                            }
                            if (response.data.results[0].geometry.location.lat) {
                                result.latitude = response.data.results[0].geometry.location.lat
                                result.longitude = response.data.results[0].geometry.location.lng
                            }
                            resolve(result)
                        } else {
                            result.status = 'invalid'
                            resolve(result)
                        }
                    } catch (err) {
                    }
                }
            })
        } catch {
            result.status = 'invalid'
            reject(result)
        }
    })
}

module.exports.geocode = geocode
