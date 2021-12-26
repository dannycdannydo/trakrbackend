const moment = require('moment')

function awult (inputs) {
    //check same numbers in array
    while(inputs.rents.length != inputs.breakDates.length || inputs.breakDates.length != inputs.expiryDates.length || inputs.expiryDates.length != inputs.rents.length){
        if(inputs.rents[inputs.rents.length - 1] == '' && inputs.expiryDates[inputs.expiryDates.length - 1] == '' && inputs.breakDates[inputs.breakDates.length - 1] == ''){
            inputs.rents = inputs.rents.splice(0, inputs.rents.length - 1)
            inputs.breakDates = inputs.breakDates.splice(0, inputs.breakDates.length - 1)
            inputs.expiryDates = inputs.expiryDates.splice(0, inputs.expiryDates.length - 1)
        }
        else if(inputs.rents[inputs.rents.length - 1] == '-' && inputs.expiryDates[inputs.expiryDates.length - 1] == '-' && inputs.breakDates[inputs.breakDates.length - 1] == '-'){
            inputs.rents = inputs.rents.splice(0, inputs.rents.length - 1)
            inputs.breakDates = inputs.breakDates.splice(0, inputs.breakDates.length - 1)
            inputs.expiryDates = inputs.expiryDates.splice(0, inputs.expiryDates.length - 1)
        }
        else {
            return({status: 'fail', result: 'You must provide the same number of rents and dates.', fullFormatResult: 'You must provide the same number of rents and dates.'})
        }
    }
    inputs.breakDates = get_date(inputs.breakDates)
    inputs.expiryDates = get_date(inputs.expiryDates)
    for(var r in inputs.rents){
        inputs.rents[r] = inputs.rents[r].toString().replace(/[^0-9.-]+/g,'') * 1
        if(inputs.rents[r] == 0 || isNaN(inputs.rents[r])){
            inputs.rents[r] = null
        }
    }
    for(var r in inputs.expiryDates){
        if(!moment.isMoment(inputs.expiryDates[r])){
            inputs.expiryDates[r] = null
        }
    }
    for(var r in inputs.breakDates){
        if(!moment.isMoment(inputs.breakDates[r])){
            inputs.breakDates[r] = null
        }
    }
    for(var i in inputs.rents) {
        inputs.rents[i] = inputs.rents[i] * 1
        inputs.totalRent = inputs.totalRent + inputs.rents[i]
    }
    //get rent weights
    let totalRent = 0
    inputs.rentWeights = []
    inputs.toExpiry = []
    inputs.toBreak = []
    inputs.expiryAwults = []
    inputs.breakAwults = []
    inputs.awulte = 0
    inputs.awultb = 0
    for(var r in inputs.rents){
        if(inputs.rents[r]){
            totalRent = totalRent + inputs.rents[r]
        }
    }
    for(var r in inputs.rents){
        if(inputs.rents[r]){
            inputs.rentWeights.push(inputs.rents[r]/totalRent)
        }
        else{
            inputs.rentWeights.push(0)
        }
    }
    for(var e in inputs.expiryDates){
        if(inputs.expiryDates[e] && inputs.expiryDates[e].diff(moment(), 'years', true) > 0){
            inputs.toExpiry.push(inputs.expiryDates[e].diff(moment(), 'years', true))
        }
        else if(inputs.expiryDates[e] && inputs.expiryDates[e].diff(moment(), 'years', true) <= 0){
            inputs.toExpiry.push(0.25)
        }
        else if(!inputs.expiryDates[e]){
            inputs.toExpiry.push(0)
        }
    }
    for(var e in inputs.breakDates){
        if(inputs.breakDates[e] && inputs.breakDates[e].diff(moment(), 'years', true) > 0){
            inputs.toBreak.push(inputs.breakDates[e].diff(moment(), 'years', true))
        }
        else if(inputs.breakDates[e] && inputs.breakDates[e].diff(moment(), 'years', true) <= 0){
            inputs.toBreak.push(0)
        }
        else if(!inputs.breakDates[e]){
            inputs.toBreak.push(0)
        }
    }
    for(var e in inputs.breakDates){
        if(inputs.toBreak[e] > 0){
            inputs.breakAwults.push(inputs.toBreak[e] * inputs.rentWeights[e])
        }
        else{
            inputs.breakAwults.push(inputs.toExpiry[e] * inputs.rentWeights[e])
        }
        inputs.expiryAwults.push(inputs.toExpiry[e] * inputs.rentWeights[e])
    }
    for(var b in inputs.breakAwults){
        inputs.awultb = inputs.awultb + inputs.breakAwults[b]
    }
    for(var e in inputs.expiryAwults){
        inputs.awulte = inputs.awulte + inputs.expiryAwults[e]
    }
    inputs.awultb = inputs.awultb.toFixed(2)*1
    inputs.awulte = inputs.awulte.toFixed(2)*1
    const result = inputs
    result.fullFormatResult = `AWULT to Expiries: ${inputs.awulte} \r\n AWULT to Breaks: ${inputs.awultb}`
    result.status = 'success'
    return(result)
}

function get_date(dates){
    for(i=0; i<dates.length; i++){
      if(moment(dates[i], "DD-MM-YYYY")._isValid){
        dates[i] = moment(dates[i],"DD-MM-YYYY")
      }
      else if(moment(dates[i], "DD-MMM-YYYY")._isValid){
        dates[i] = moment(dates[i],"DD-MMM-YYYY")
      }
      else if(moment(dates[i], "DD-MMMM-YYYY")._isValid){
        dates[i] = moment(dates[i],"DD-MMMM-YYYY")
      }
      else if(moment(dates[i], "YYYY-MM-DD")._isValid){
        dates[i] = moment(dates[i],"YYYY-MM-DD")
      }
      else if(moment(dates[i], "MMMM Do, YYYY")._isValid){
        dates[i] = moment(dates[i],"MMMM Do, YYYY")
      }
      else if(moment(dates[i], "MM-DD-YYYY")._isValid){
        dates[i] = moment(dates[i],"MM-DD-YYYY")
      }
      else if(moment(dates[i], "MMM-DD-YYYY")._isValid){
        dates[i] = moment(dates[i],"MMM-DD-YYYY")
      }
      else if(moment(dates[i], "MMMM-DD-YYYY")._isValid){
        dates[i] = moment(dates[i],"MMMM-DD-YYYY")
      }
    }
    return(dates)
  }

module.exports.awult = awult