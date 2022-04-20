var express = require('express');
var router = express.Router();
const { mongoInsert, mongoQuery, mongoDelete, mongoDeleteMany, mongoCount, introQueryMongoliser } = require('../../../public/pelotonIntro/scripts/database/mongoFunctions')
var ObjectId = require('mongodb').ObjectId; 

router.post('/pelotonIntro/dbFunctions/addToMyList', async function(req, res, next) {
    const result = await mongoInsert('pelotonUserLists', req.body.user, req.body.asset)
    res.send(result)
});

router.post('/pelotonIntro/dbFunctions/checkMyList', async function(req, res, next) {
    if (req.body.user) {
        try {
            const result = await mongoQuery('pelotonUserLists', req.body.user, {"id": req.body.asset.id }, 100000000, {'dateSent': -1})
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

router.post('/pelotonIntro/dbFunctions/listToIntros', async function(req, res, next) {
    if (req.body.list) {
        try {
            const ids = { _id: [] }
            for (var l in req.body.list) {
                ids._id.push(req.body.list[l].id)
            }
            const query = await introQueryMongoliser(ids)
            const results = await mongoQuery('peloton', 'intros', query, 100000000, {'asset.dateSent': -1}  )
            res.send(results)
        } catch {
            res.send(false)
        }
    } else {
        res.send(false)
    }
});

router.post('/pelotonIntro/dbFunctions/removeFromMyList', async function(req, res, next) {
    if (req.body.user) {
        try {
            const result = await mongoDelete('pelotonUserLists', req.body.user, {"id": req.body.asset.id })
            res.send(result)
        } catch {
            res.send(false)
        }
    }
});

router.post('/pelotonIntro/dbFunctions/clearMyList', async function(req, res, next) {
    if (req.body.user) {
        try {
            const result = await mongoDeleteMany('pelotonUserLists', req.body.user, {})
            res.send(result)
        } catch {
            res.send(false)
        }
    } else {
        res.send(false)
    }
});

router.post('/pelotonIntro/dbFunctions/getMyList', async function(req, res, next) {
    console.log(req.body)
    if (req.body.user) {
        try {
            const result = await mongoQuery('pelotonUserLists', req.body.user, {}, 100000000, {'dateSent': -1})
            res.send(result)
        } catch {
            res.send(false)
        }
    } else {
        res.send(false)
    }
});

router.post('/pelotonIntro/dbFunctions/countMyList', async function(req, res, next) {
    if (req.body.user) {
        try {
            const result = await mongoCount('pelotonUserLists', req.body.user, {})
            res.send({value: result})
        } catch {
            res.send(false)
        }
    } else {
        res.send({value: 0})
    }
});


module.exports = router;