const { netinitialyield } = require('./niy')
const formatting = require('./formatting')

function blendedyields (inputs) {
    let prices = []
    inputs.totalPrice = 0
    //check same numbers in array
    while(inputs.rents.length > inputs.yields.length){
        if(inputs.rents[inputs.rents.length - 1] == ''){
            inputs.rents = inputs.rents.splice(0, inputs.rents.length - 1)
        }
        else {
            return({status: 'fail', result: 'You must provide the same number of rents and yields.', fullFormatResult: 'You must provide the same number of rents and yields.'})
        }
    }
    while(inputs.yields.length > inputs.rents.length){
        if(inputs.yields[inputs.yields.length - 1] == ''){
            inputs.yields = inputs.yields.splice(0, inputs.yields.length - 1)
        }
        else {
            return({status: 'fail', result: 'You must provide the same number of rents and yields.', fullFormatResult: 'You must provide the same number of rents and yields.'})
        }
    }
    while(inputs.rents[inputs.rents.length - 1] == '' && inputs.yields[inputs.yields.length - 1] == ''){
        inputs.rents = inputs.rents.splice(0, inputs.rents.length - 1)
        inputs.yields = inputs.yields.splice(0, inputs.yields.length - 1)
    }
    //get rid of any none number inputs
    for(var i = 0; i<inputs.rents.length; i++){
        inputs.rents[i] = inputs.rents[i].replace(/[^0-9.-]+/g,'')
        inputs.yields[i] = inputs.yields[i].replace(/[^0-9.-]+/g,'')
        if(!Number.isFinite(inputs.rents[i] * 1) || inputs.rents[i] * 1 == 0 || !Number.isFinite(inputs.yields[i] * 1) || inputs.yields[i] * 1 == 0){
            return({status: 'fail', result: 'All inputs must be numbers. No blanks or non-numbers.', fullFormatResult: 'All inputs must be numbers. No blanks or non-numbers.'})
        }
        let p = netinitialyield({rent:inputs.rents[i] * 1, yield:inputs.yields[i] * 1, togc: inputs.togc}).result.price
        prices.push(Math.round(p/500) * 500)
        inputs.totalPrice = inputs.totalPrice + (Math.round(p/500) * 500)
    }
    inputs.prices = prices
    inputs.items = []
    inputs.totalRent = 0
    inputs.formattedResult = []
    for(var i in inputs.rents) {
        inputs.rents[i] = inputs.rents[i] * 1
        inputs.totalRent = inputs.totalRent + inputs.rents[i]
    }
    inputs.blendedYield = netinitialyield({rent: inputs.totalRent, price:inputs.totalPrice, togc: inputs.togc}).result.yield
    inputs.headers = [{text: 'Unit', value: 'unit'}, {text: 'Rent', value: 'rent'}, {text: 'Yield', value: 'yield'}, {text: 'Price (to nearest £500)', value: 'price'}]
    for(var i in inputs.rents){
        inputs.items.push({unit: i*1 + 1, rent: inputs.rents[i], yield: inputs.yields[i], price: inputs.prices[i]})
        inputs.formattedResult.push({
            unit: i*1 + 1,
            rent: formatting.format('money', {decimals:0, input: inputs.rents[i]}),
            yield: formatting.format('percentage', {decimals:2, input: inputs.yields[i]/100}),
            price: formatting.format('money', {decimals:0, input: inputs.prices[i]}),
        })
    }
    inputs.items.push({unit: 'Total / Average', rent: inputs.totalRent, yield: inputs.blendedYield, price: inputs.totalPrice})
    inputs.formattedResult.push({
        unit: 'Total / Average',
        rent: formatting.format('money', {decimals:0, input: inputs.totalRent}),
        yield: formatting.format('percentage', {decimals:2, input: inputs.blendedYield}),
        price: formatting.format('money', {decimals:0, input: inputs.totalPrice}),
    })
    inputs.status = 'success'
    return(inputs)
}

module.exports.blendedyields = blendedyields