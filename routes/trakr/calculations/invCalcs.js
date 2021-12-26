var express = require('express');
var router = express.Router();
const { netinitialyield } = require('../../../public/trakr/scripts/calculations/niy')
const { blendedyields } = require('../../../public/trakr/scripts/calculations/blendedYields')
const { rentalgrowth } = require('../../../public/trakr/scripts/calculations/rentalGrowth')
const { awult } = require('../../../public/trakr/scripts/calculations/awult')
const { pricesensitivity } = require('../../../public/trakr/scripts/calculations/priceSensitivity')

router.post('/trakr/calculations/invCalcs', async function(req, res, next) {
    let result = null
    let data = req.body
    if (data.calc == "Net Initial Yield") {
        result = netinitialyield(data.inputs)
    }
    else if (data.calc == "Blended Yields") {
        result = blendedyields(data.inputs)
    }
    else if (data.calc == "Rental Growth") {
        result = rentalgrowth(data.inputs)
    }
    else if (data.calc == "AWULT") {
        result = awult(data.inputs)
    }
    else if (data.calc == "Price Sensitivity") {
        result = pricesensitivity(data.inputs)
    }
    result.type = data.calc
    res.send(result)
});

module.exports = router;