var express = require('express');
var router = express.Router();
const { mongoInsert, mongoQuery, mongoDelete, mongoDeleteMany, mongoCount } = require('../../../public/trakr/scripts/db/mongoFunctions')

router.post('/trakr/dbFunctions/addToMyList', async function(req, res, next) {
    const result = await mongoInsert('userLists', req.body.user, req.body.asset)
    res.send(result)
});

router.post('/trakr/dbFunctions/checkMyList', async function(req, res, next) {
    if (req.body.user) {
        try {
            const result = await mongoQuery('userLists', req.body.user, {'base.filename': req.body.asset.base.filename}, 100000000, {'meta.dateCreated': -1})
            if (result[0]) {
                res.send(true)
            } else {
                res.send(false)
            }
        } catch {
            res.send(false)
        }
    } else {
        res.send(false)
    }
    
});

router.post('/trakr/dbFunctions/removeFromMyList', async function(req, res, next) {
    if (req.body.user) {
        try {
            const result = await mongoDelete('userLists', req.body.user, {'base.filename': req.body.asset.base.filename})
            res.send(result)
        } catch {
            res.send(false)
        }
    }
});

router.post('/trakr/dbFunctions/clearMyList', async function(req, res, next) {
    if (req.body.user) {
        try {
            const result = await mongoDeleteMany('userLists', req.body.user, {})
            res.send(result)
        } catch {
            res.send(false)
        }
    } else {
        res.send(false)
    }
});

router.post('/trakr/dbFunctions/getMyList', async function(req, res, next) {
    if (req.body.user) {
        try {
            const result = await mongoQuery('userLists', req.body.user, {}, 100000000, {'meta.dateCreated': -1})
            res.send(result)
        } catch {
            res.send(false)
        }
    } else {
        res.send(false)
    }
});

router.post('/trakr/dbFunctions/countMyList', async function(req, res, next) {
    if (req.body.user) {
        try {
            const result = await mongoCount('userLists', req.body.user, {})
            res.send({value: result})
        } catch {
            res.send(false)
        }
    } else {
        res.send({value: 0})
    }
});


module.exports = router;