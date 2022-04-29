const { mongoQuery } = require('../database/mongoFunctions')
const _ = require('lodash')

async function findAssetGroup(asset){
    let tempDate = _.cloneDeep(asset.dateSent)
    let tempDateTwo = _.cloneDeep(asset.dateSent)
    const minDate = new Date(tempDate.setDate(tempDate.getDate() - 30))
    const maxDate = new Date(tempDateTwo.setDate(tempDateTwo.getDate() + 30))
    const data = 
        {
            "asset.dateSent": 
                {
                    '$gt': minDate,'$lt': maxDate
                },
            'asset.coords.loc': 
                {
                    '$geoWithin': 
                        {
                            '$centerSphere': [asset.coords[0].loc.coordinates, milesToRadian(0.062)]
                        }
                }
        }
    const result = await mongoQuery('peloton', 'intros', data, 10000000000, {dateSent: -1})
    if(result.length > 0){
        return([true, result[0]])
    }
    else{
        return([false])
    }
}

var milesToRadian = function(miles){
    var earthRadiusInMiles = 3959;
    return miles / earthRadiusInMiles;
};

function daysToMilliseconds(d){
    return((d * (60*60*24*1000)))
}

module.exports.findAssetGroup = findAssetGroup