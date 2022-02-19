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
                await dbo.collection(collection).updateMany(filter, update, async function(err, res) {
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
        if(data._id){
            data._id = new ObjectId(data._id)
        }
        MongoClient.connect(config.trakrDBConnectionString, {useUnifiedTopology: true}, function(err, db) {
            if (err) resolve(err);
            var dbo = db.db(database);
            // get a collection
            var coll = dbo.collection(collection);
            var standard = mquery().setOptions({ collection: coll, limit: freq, sort: sort})
            // pass it to the constructor
            standard.find(data, function(err, docs) {
                if(err) console.log(err)
                resolve(docs)
            })
          })
    })
}


module.exports.mongoInsert = mongoInsert
module.exports.mongoQuery = mongoQuery
module.exports.mongoUpdate = mongoUpdate