var express = require('express');
var router = express.Router();
const { mongoQuery, mongoInsert } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')

router.post('/pelotonIntro/dbFunctions/profileChange', async function(req, res, next) {
    const result = await mongoQuery('peloton', 'intros', {}, 100000000, null)
    for (var r in result) {
        let adds = []
        let coords = []
        if (result[r].asset.address) {
            adds.push(result[r].asset.address)
        }
        result[r].asset.address = adds
        if (result[r].asset.loc) {
            coords.push({ loc: result[r].asset.loc })
        }
        result[r].asset.coords = coords
        delete result[r].asset.loc
        for (var i in result[r].intros) {
            result[r].intros[i].address = adds
            result[r].intros[i].coords = coords
            delete result[r].intros[i].loc
        }
    }
    for(var r in result) {
        mongoInsert('peloton', 'intros', result[r])
    }
  });


module.exports = router;