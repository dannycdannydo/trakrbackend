const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb')
const config = require('../../../../config/config')
const mquery = require('mquery')
var ObjectId = require('mongodb').ObjectId; 

let mongoInsert = async function mongoInsert(database, collection, data)
{
    return new Promise(async function(resolve, reject)
    {
        try {
            MongoClient.connect(config.trakrDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true}, async function(err, db) {
                if (err) {console.log(err)
                    throw err};
                var dbo = db.db(database);
                await dbo.collection(collection).insertOne(data, async function(err, res) {
                if (err){
                    console.log(err)
                    if(err.code = 11000){
                        resolve("Duplicate")
                    }
                }
                console.log("1 document inserted");
                db.close();
                resolve('Success')
                });
            });
        }
        catch {
            reject()
        }
    })
}

let mongoCount = async function mongoCount(database, collection, query)
{
    return new Promise(async function(resolve, reject)
    {
        MongoClient.connect(config.trakrDBConnectionString, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(database)
            dbo.collection(collection).count(query, function(err, result) {
              if (err){
                db.close();
                reject()
              }
              db.close();
              resolve(result)
            });
        }); 
    })
}

let mongoUpdate = async function mongoUpdate(database, collection, filter, update)
{
    return new Promise(async function(resolve, reject)
    {
        try {
            if(filter._id){
                filter._id = new ObjectId(filter._id)
            }
            MongoClient.connect(config.trakrDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true}, async function(err, db) {
                if (err) {console.log(err)
                    throw err};
                var dbo = db.db(database);
                await dbo.collection(collection).updateMany(filter, { $set: update }, async function(err, res) {
                if (err){
                    console.log(err)
                    if(err.code = 11000){
                        resolve("Duplicate")
                    }
                }
                console.log("1 document updated");
                db.close();
                resolve('Success')
                });
            });
        }
        catch {
            reject()
        }
    })
}

let mongoUpdatePush = async function mongoUpdatePush(database, collection, filter, update)
{
    return new Promise(async function(resolve, reject)
    {
        try {
            if(filter._id){
                filter._id = new ObjectId(filter._id)
            }
            MongoClient.connect(config.trakrDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true}, async function(err, db) {
                if (err) {console.log(err)
                    throw err};
                var dbo = db.db(database);
                await dbo.collection(collection).updateMany(filter, { $push: update }, async function(err, res) {
                if (err){
                    console.log(err)
                    if(err.code = 11000){
                        resolve("Duplicate")
                    }
                }
                console.log("1 document updated");
                db.close();
                resolve('Success')
                });
            });
        }
        catch {
            reject()
        }
    })
}

let mongoQuery = async function mongoQuery(database, collection, data, freq, sort)
{
    return new Promise(async function(resolve, reject)
    {
        MongoClient.connect(config.trakrDBConnectionString, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(database);
            dbo.collection(collection).find(data).sort(sort).limit(freq).toArray(function(err, result) {
              if (err){
                db.close();
                console.log(err)
                reject()
              }
              db.close();
              resolve(result)
            });
        }); 
    })
}

let mongoDelete = async function mongoDelete(database, collection, filter)
{
    return new Promise(async function(resolve, reject)
    {
        MongoClient.connect(config.trakrDBConnectionString, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(database);
            dbo.collection(collection).deleteOne(filter, function(err, result) {
              if (err){
                    db.close();
                    console.log(err)
                    reject()
              }
              db.close();
              resolve(result)
            });
        }); 
    })
}

let mongoDeleteMany = async function mongoDeleteMany(database, collection, filter)
{
    return new Promise(async function(resolve, reject)
    {
        MongoClient.connect(config.trakrDBConnectionString, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(database);
            dbo.collection(collection).deleteMany(filter, function(err, result) {
              if (err){
                    db.close();
                    console.log(err)
                    reject()
              }
              db.close();
              resolve(result)
            });
        }); 
    })
}

let mongoDeleteGeneral = async function mongoDelete(database, collection, filter)
{
    return new Promise(async function(resolve, reject)
    {
        MongoClient.connect(config.trakrDBConnectionString, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(database);
            dbo.collection(collection).deleteOne( filter, function(err, result) {
              if (err){
                    db.close();
                    console.log(err)
                    reject()
              }
              db.close();
              resolve(result)
            });
        }); 
    })
}

async function introQueryMongoliser(data)
{
    let  mong = {'$and': []}
    for(const [key, value] of Object.entries(data)){
        if(Array.isArray(value) && value[0]){
            mong['$and'].push(await introQueryArrayMongoliser(key, value))
        }
        else if(key == 'maxPrice' && value){
            mong['$and'].push({'asset.price': {'$lte': value * 1}})
        }
        else if(key == 'minPrice' && value){
            mong['$and'].push({'asset.price': {'$gte': value * 1}})
        }
        else if(key == 'dateSentStart' && value){
            mong['$and'].push({'asset.dateSent': {'$gte': new Date(value)}})
        }
        else if(key == 'dateSentEnd' && value){
            mong['$and'].push({'asset.dateSent': {'$lte': new Date(value)}})
        }
        else if(key == 'coords' && value){
            mong['$and'].push({'asset.coords.loc': {'$geoWithin': {'$centerSphere': [[value.longitude*1, value.latitude*1], value.miles*1/3959]}}})
        }
    }
    if(!mong['$and'][0]){
        mong = ''
    }
    return(mong)
}

async function introQueryArrayMongoliser(key, value)
{
    let mongoloid = {'$or': []}
    for(var v in value){
        if(key == '_id'){
            mongoloid['$or'].push({"_id": ObjectId(value[v])} )
        }
        else if(key == 'agency'){
            mongoloid['$or'].push({'intros': {'$elemMatch': {'agencies':`${value[v]}`}}})
        }
        else if(key == 'sectors'){
            mongoloid['$or'].push({'asset.sectors':`${value[v]}`})
        }
        else if(key == 'pot'){
            mongoloid['$or'].push({"asset.pots": `${value[v]}`})
        }
        // else if(key == 'tenants'){
        //     mongoloid['$or'].push({'tenants': {'$elemMatch': {'tenant': new RegExp(value[v])}}})
        // }
        // else if(key == '_id'){
        //     mongoloid['$or'].push({"_id": ObjectId(value[v])} )
        // }
    }
    return(mongoloid)
}


module.exports.mongoInsert = mongoInsert
module.exports.mongoQuery = mongoQuery
module.exports.mongoUpdate = mongoUpdate
module.exports.mongoUpdatePush = mongoUpdatePush
module.exports.mongoDelete = mongoDelete
module.exports.mongoDeleteMany = mongoDeleteMany
module.exports.mongoDeleteGeneral = mongoDeleteGeneral
module.exports.introQueryMongoliser = introQueryMongoliser
module.exports.introQueryArrayMongoliser = introQueryArrayMongoliser
module.exports.mongoCount = mongoCount