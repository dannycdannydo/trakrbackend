const { netinitialyield } = require('./niy')
const formatting = require('./formatting')

function pricesensitivity(data) {
    let count = 0
    let prices = []
    let formattedPrices = []
    let yields = []
    let formattedYields = []
    let reversions = []
    let formattedReversions = []
    let result = {items:[], formattedResult: []}
    if(data.price && data.rent && data.yield){
        return({status: 'fail', result: 'Please only provide 2 inputs out of Price, Rent or Yield.', fullFormatResult: 'Please only provide 2 inputs out of Price, Rent or Yield.'})
    }
    if(data.price){count = count + 1}
    if(data.rent){count = count + 1}
    if(data.yield){count = count + 1}
    if(count != 2) {
        return({status: 'fail', result: 'Exactly 2 inputs out of Price, Rent or Yield are required.', fullFormatResult: 'Exactly 2 inputs out of Price, Rent or Yield are required.'})
    }
    if(!data.sensitivity){
        return({status: 'fail', result: "You haven't provide your price sensitivty level. E.g 5%.", fullFormatResult: "You haven't provide your price sensitivty level. E.g 5%."})
    } else {
        data.sensitivity = (data.sensitivity.toString().replace(/[^0-9.-]+/g,'') / 100).toFixed(4)*1
    }
    if(!data.price){
        data.price = netinitialyield({rent: data.rent, yield: data.yield, togc: data.togc}).result.price
    }
    if(!data.rent){
        data.rent = netinitialyield({price: data.price, yield: data.yield, togc: data.togc}).result.rent
    }
    if(!data.yield){
        data.yield = netinitialyield({price: data.price, rent: data.rent, togc: data.togc}).result.yield
    }
    for(var i = 0; i < 3; i++){
        prices.push(data.price * (1-((3-i) * data.sensitivity)))
    }
    prices.push(data.price)
    for(var i = 1; i <= 3; i++){
        const p = data.price * (1+(i * data.sensitivity))
        prices.push(p)
    }
    data.prices = prices
    if(!data.erv){
        data.erv = data.rent
    }
    for(var p in data.prices) {
        const pr = data.prices[p]
        const formatP = formatting.format('money', {decimals: 0, input: pr})
        const y = netinitialyield({price: data.prices[p], rent: data.rent, togc: data.togc}).result.yield
        const formatY = formatting.format('percentage', {decimals: 2, input: y})
        const ry = netinitialyield({price: data.prices[p], rent: data.erv, togc: data.togc}).result.yield
        const formatry = formatting.format('percentage', {decimals: 2, input: ry})
        yields.push(y)
        reversions.push(ry)
        formattedPrices.push(formatP)
        formattedYields.push(formatY)
        formattedReversions.push(formatry)
    }
    data.yields = yields
    data.reversions = reversions
    result.headers = [{text:'Price', value: 'price'}, {text:'NIY', value: 'niy'}, {text:'Reversionary Yield', value: 'ry'}]
    for(var p in prices){
        result.items.push({price: prices[p], niy: yields[p], ry: reversions[p]})
        result.formattedResult.push({price: formattedPrices[p], niy: formattedYields[p], ry: formattedReversions[p]})
    }
    result.status = 'success'
    return(result)
}

module.exports.pricesensitivity = pricesensitivity