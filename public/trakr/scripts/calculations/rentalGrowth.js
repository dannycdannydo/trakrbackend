const { netinitialyield } = require('./niy')
const formatting = require('./formatting')

function rentalgrowth (data) {
    const result = {items: [], formattedResult: []}
    const years = []
    const rents = []
    const yields = []
    for(var [key, value] of Object.entries(data)) {
        if(key != 'togc') {
            value = value.toString().replace(/[^0-9.-]+/g,'') * 1
        }
    }
    if(data.rent && data.reviewpattern && data.leaselength && data.growthrate){
        data.leaselength = data.leaselength * 1
        data.reviewpattern = data.reviewpattern * 1
        data.growthrate = data.growthrate / 100
        const reviewCount = Math.floor(data.leaselength / data.reviewpattern )
        for(var r = 0; r < reviewCount; r++){
            years.push(r * data.reviewpattern)
            rents.push((data.rent * ((1 + data.growthrate)**(r * data.reviewpattern))).toFixed(0)*1)
            if(data.price){
                const yield = netinitialyield({rent: rents[r], togc: data.togc, price: data.price}).result.yield
                yields.push(yield)
                result.items.push({
                    year: r * data.reviewpattern,
                    rent: (data.rent * ((1 + data.growthrate)**(r * data.reviewpattern))).toFixed(0)*1,
                    niy: yield
                })
                result.formattedResult.push({
                    year: r * data.reviewpattern,
                    rent: formatting.format('money', {decimals:0, input: (data.rent * ((1 + data.growthrate)**(r * data.reviewpattern))).toFixed(0)*1}),
                    niy: formatting.format('percentage', {decimals:2, input: yield})
                })
            }
            else{
                yields.push('N/A')
                result.items.push({
                    year: r * data.reviewpattern,
                    rent: (data.rent * ((1 + data.growthrate)**(r * data.reviewpattern))).toFixed(0)*1,
                    niy: 'N/A'
                })
                result.formattedResult.push({
                    year: r * data.reviewpattern,
                    rent: formatting.format('money', {decimals:0, input: (data.rent * ((1 + data.growthrate)**(r * data.reviewpattern))).toFixed(0)*1}),
                    niy: 'N/A'
                })
            }
        }
        result.headers = [{text: 'Year', value: 'year'}, {text: 'Rent', value: 'rent'}, {text: 'NIY', value: 'yield'}]
        result.status = 'success'
        result.years = years
        result.rents = rents
        result.yields = yields
        return(result)
    }
    return({status: 'fail', result: 'All inputs except for price are required.', fullFormatResult: 'All inputs except for price are required.'})
}

module.exports.rentalgrowth = rentalgrowth