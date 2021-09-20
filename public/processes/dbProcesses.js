const { brochureQueryMongoliser, mongoQuery, mongoSums } = require('../scripts/db/mongoFunctions')
const _ = require('lodash')

let brochureQueryProcess = async function brochureQueryProcess(data)
{
    return new Promise(async function(resolve, reject)
    {
        //as standard set frequency to 1m to get all results.
        //set sort to sort by newest to oldest unless specified in request
        let freq=10000000
        let sort= {
            'meta.dateCreated': -1
        };
        if(data.sort){
            sort = data.sort
        }
        if(data.freq){
            freq = data.freq
        }
        const mongolisedQuery = await brochureQueryMongoliser(data)
        let result = {}
        result.assets = await mongoQuery('trakr', 'brochures', mongolisedQuery, freq, sort)
        result.sums = await mongoSums(_.cloneDeep(result.assets))
        resolve(result)
    })
}

module.exports.brochureQueryProcess = brochureQueryProcess