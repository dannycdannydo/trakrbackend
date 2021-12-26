const formatting = require('./formatting')

function netinitialyield (inputs) {
    if(inputs.yield){
        inputs.yield = inputs.yield.toString().replace(/[^0-9.-]+/g,'') * 1
        inputs.yield = inputs.yield / 100
    }
    if(inputs.rent){
        inputs.rent = inputs.rent.toString().replace(/[^0-9.-]+/g,'') * 1
    }
    let values = 0
    let result = null
    let stamp = 0
    //first check the right number of inputs were sent by counting them. 
    for(const [key, value] of Object.entries(inputs)){
        if(value && key != 'togc'){
            values++
        }
    }
    //if count is not two, need to send an error message back.
    if(values == 3) {
        return({status: 'fail', result: 'Please input only 2 of the 3 values.', fullFormatResult: 'Please input only 2 of the 3 values.'})
    }
    if(values < 2) {
        return({status: 'fail', result: 'At least 2 of the three inputs are required.', fullFormatResult: 'At least 2 of the three inputs are required.'})
    }
    //if a price was provided, calculate stamp based on TOGC status
    if(!inputs.togc) {
        if(inputs.price){
            if(inputs.price < 150000){stamp = 0;}
            if(inputs.price < 250000 && inputs.price > 149999){stamp = (inputs.price - 150000) * 0.02;}
            if (inputs.price > 249999) {stamp = ((inputs.price - 250000) * 0.05 + 2000);}
        }
    }
    else {
        if(inputs.price){
            if(inputs.price < 150000){stamp = 0}
            if(inputs.price < 250000 && inputs.price > 149999){stamp = ((1.2 * inputs.price) - 150000) * 0.02}
            if (inputs.price > 249999) {stamp = (((1.2 * inputs.price) - 250000) * 0.05 + 2000);}
        }
    }
    //do calculation for price and rent to give a yield
    if(inputs.price && inputs.rent) {
        let yield = (inputs.rent / (( inputs.price * 1.018 ) + stamp )).toFixed(4)*1
        let totalCostsAsPercentage = ((stamp / inputs.price) + 0.018).toFixed(4)*1
        let totalCosts = (totalCostsAsPercentage * inputs.price).toFixed(0)*1
        const formattedYield = formatting.format('percentage', {decimals:2, input: yield})
        const formattedStamp = formatting.format('money', {decimals:0, input: stamp})
        const formattedTotalCosts = formatting.format('money', {decimals:0, input: totalCosts})
        const formattedTotalCostsAsPercentage = formatting.format('percentage', {decimals:2, input: totalCostsAsPercentage})
        const fullFormatResult = `Yield: ${formattedYield} ||  Total Costs: ${formattedTotalCosts} (${formattedTotalCostsAsPercentage})  ||  Stamp: ${formattedStamp}`
        return( { 
            status: 'success', 
            result: {yield: yield, stamp: stamp, totalCosts: totalCosts, totalCostsAsPercentage: totalCostsAsPercentage}, 
            formattedResult: {yield: formattedYield, stamp: formattedStamp, totalCosts: formattedTotalCosts, totalCostsAsPercentage: formattedTotalCostsAsPercentage},
            fullFormatResult: fullFormatResult
        } )
    }
    else if(inputs.rent && inputs.yield) {
        let price = 0
        if(!inputs.togc)
          {
            if(((inputs.rent / inputs.yield) / 1.018) < 150000)
            {
                price = (inputs.rent/(1.018 * inputs.yield))
              stamp = 0
            }
            if((((inputs.rent / inputs.yield) + 3000) / 1.038) < 250000 && (((inputs.rent / inputs.yield) + 3000) / 1.038) > 149999){
                price = (((inputs.rent / inputs.yield) + 3000) / 1.038)
              stamp = (price - 150000) * 0.02
            }
            if((((inputs.rent / inputs.yield) + 10500) / 1.068) > 249999){
                price = (((inputs.rent / inputs.yield) + 10500) / 1.068)
              stamp = ((price - 250000) * 0.05) + 2000;
            }
          }
        else if(inputs.togc)
        {
            if(((inputs.rent / inputs.yield) / 1.018) < 150000)
            {
                price = (inputs.rent/(1.018 * inputs.yield))
            }
            if((((inputs.rent / inputs.yield) + 3000) / 1.038) < 250000 && (((inputs.rent / inputs.yield) + 3000) / 1.038) > 149999){
                price = (((inputs.rent / inputs.yield) + 3000) / 1.038)
            stamp = ((1.2 * price) - 150000) * 0.02
            }
            if((((inputs.rent / inputs.yield) + 10500) / 1.078) > 249999)
            {
                price = (((inputs.rent / inputs.yield) + 10500) / 1.078)
                stamp = (((1.2 * price) - 250000) * 0.05) + 2000;
            }
        }
        let totalCosts = (stamp + (price * 0.018)).toFixed(0)*1
        let totalCostsAsPercentage = (totalCosts / price).toFixed(4)*1
        const formattedPrice = formatting.format('money', {decimals:0, input: price})
        const formattedStamp = formatting.format('money', {decimals:0, input: stamp})
        const formattedTotalCosts = formatting.format('money', {decimals:0, input: totalCosts})
        const formattedTotalCostsAsPercentage = formatting.format('percentage', {decimals:2, input: totalCostsAsPercentage})
        const fullFormatResult = `Price: ${formattedPrice} ||  Total Costs: ${formattedTotalCosts} (${formattedTotalCostsAsPercentage})  ||  Stamp: ${formattedStamp}`
        return( { 
            status: 'success', 
            result: {price: price.toFixed(0)*1, stamp: stamp.toFixed(0)*1, totalCosts: totalCosts, totalCostsAsPercentage: totalCostsAsPercentage}, 
            formattedResult: {price: formattedPrice, stamp: formattedStamp, totalCosts: formattedTotalCosts, totalCostsAsPercentage: formattedTotalCostsAsPercentage},
            fullFormatResult: fullFormatResult
        } )
    }
    else if(inputs.price && inputs.yield) {
        let rent = inputs.yield * ((inputs.price * 1.018) + stamp)
        let totalCostsAsPercentage = ((stamp / inputs.price) + 0.018).toFixed(4)*1
        let totalCosts = (totalCostsAsPercentage * inputs.price).toFixed(0)*1
        const formattedRent = formatting.format('money', {decimals:0, input: rent})
        const formattedStamp = formatting.format('money', {decimals:0, input: stamp})
        const formattedTotalCosts = formatting.format('money', {decimals:0, input: totalCosts})
        const formattedTotalCostsAsPercentage = formatting.format('percentage', {decimals:2, input: totalCostsAsPercentage})
        const fullFormatResult = `Rent: ${formattedRent} ||  Total Costs: ${formattedTotalCosts} (${formattedTotalCostsAsPercentage})  ||  Stamp: ${formattedStamp}`
        return( { 
            status: 'success', 
            result: {rent: rent, stamp: stamp, totalCosts: totalCosts, totalCostsAsPercentage: totalCostsAsPercentage}, 
            formattedResult: {rent: formattedRent, stamp: formattedStamp, totalCosts: formattedTotalCosts, totalCostsAsPercentage: formattedTotalCostsAsPercentage},
            fullFormatResult: fullFormatResult
        } )
    }
    return({status: 'fail', result: 'There was an error in the calculation, please try again.', fullFormatResult: 'There was an error in the calculation, please try again.'})
}

module.exports.netinitialyield = netinitialyield