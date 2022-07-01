var express = require('express');
var router = express.Router();
const { brochureQueryMongoliser, mongoQuery, mongoSums } = require('../../../public/trakr/scripts/db/mongoFunctions')
const _ = require('lodash')
const { getOrganisations } = require('../../../public/trakr/scripts/auth/getOrganisations')

router.post('/trakr/dbFunctions/brochureQuery', async function(req, res, next) {
    const hello = 1
    hello + 2
    const exclude = []
    if (req.body.exclude) {
        for (var e in req.body.exclude) {
            exclude.push(req.body.exclude[e])
        }
        delete req.body.exclude
    }
    let data = {}
    if(req.body.query) {
        data = req.body.query
    }
    let freq=10000000
    let sort= {
        'meta.dateCreated': -1
    };
    if(req.body.freq){
        freq = req.body.freq
    }
    const mongolisedQuery = await brochureQueryMongoliser(data)
    let result = {}
    let trakrAssets = await mongoQuery('trakr', 'brochures', mongolisedQuery, freq, sort)
    if (req.body.user && !req.body.user.includes('@trakr.it')) {
        let userAssets = await mongoQuery('userUploads', req.body.user, mongolisedQuery, freq, sort)
        let orgAssets = []
        if (req.body.userId) {
            const orgs = await getOrganisations(req.body.userId)
            if (orgs[0]) {
                for (var o in orgs) {
                    orgAssets = [...(await mongoQuery('orgUploads', orgs[o], mongolisedQuery, freq, sort))]
                }
            }
        }
        const mergedArray = [ ...orgAssets, ...userAssets, ...trakrAssets];
        // mergedArray have duplicates, lets remove the duplicates using Set
        let set = new Set();
        result.assets = mergedArray.filter(item => {
        if (!set.has(item.base.filename)) {
            set.add(item.base.filename);
            return true;
        }
        return false;
        }, set);
    } else {
        result.assets = trakrAssets
    }
    result.assets.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.meta.dateCreated) - new Date(a.meta.dateCreated);
      });
    result.sums = await mongoSums(_.cloneDeep(result.assets))
    if (exclude.length > 0 && exclude.includes('assets')) {
        delete result.assets
    }
    res.send(result)
});

module.exports = router;