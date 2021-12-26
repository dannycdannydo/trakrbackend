function format(type, data) {
    let result = null
    if(type == 'money') {
        result = money(data)
    }
    if(type == 'percentage') {
        result = percentage(data)
    }
    return result
}

function money(data) {
    let result = (new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0,
          maximumFractionDigits: data.decimals}).format(data.input));
    return result
}

function percentage(data) {
    let result = (new Intl.NumberFormat('en-GB', { style: 'percent', maximumFractionDigits: data.decimals}).format(data.input))
    return result
}

module.exports.format = format