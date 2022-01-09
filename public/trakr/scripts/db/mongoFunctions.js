const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dannycdannydo:Xz06&!y796@cluster0.c9qdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectId; 

let mongoInsert = async function mongoInsert(database, collection, data)
{
    return new Promise(async function(resolve, reject)
    {
        MongoClient.connect(uri, {useUnifiedTopology: true}, async function(err, db) {
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
    })
}

let mongoQuery = async function mongoQuery(database, collection, data, freq, sort)
{
    return new Promise(async function(resolve, reject)
    {
        MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(database);
            dbo.collection(collection).find(data).sort(sort).limit(freq).toArray(function(err, result) {
              if (err){
                  console.log(err)
                  reject()
              }
              db.close();
              resolve(result)
            });
        }); 
    })
}

let mongoReplace = async function mongoReplace(database, collection, id, update)
{
    return new Promise(async function(resolve, reject)
    {
        MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(database);

            dbo.collection(collection).replaceOne({"_id": ObjectId(id)}, update, function(err, result) {
              if (err){
                  console.log(err)
                  reject()
              }
              db.close();
              resolve(result)
            });
        }); 
    })
}

let mongoDelete = async function mongoDelete(database, collection, id)
{
    return new Promise(async function(resolve, reject)
    {
        MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(database);
            dbo.collection(collection).deleteOne({"_id": ObjectId(id)}, function(err, result) {
              if (err){
                  console.log(err)
                  reject()
              }
              db.close();
              resolve(result)
            });
        }); 
    })
}


let mongoSums = async function mongoSums(data)
{
    return new Promise(function (resolve, reject) {
        const sums = {
            assets: 0,
            price: { avg: 0, sum: 0, count: 0 },
            rent: { avg: 0, sum: 0, count: 0 },
            yield: { avg: 0, sum: 0, count: 0 },
        }
        const portfolios = []
        for (var d in data) {
            if (portfolios.includes(data[d].base.filename.slice(0, data[d].base.filename.indexOf('portcount')))) {
                continue
            }
            if (data[d].base.portfolio === 1) {
                portfolios.push(data[d].base.filename.slice(0, data[d].base.filename.indexOf('portcount')))
            }
            sums.assets++
            if (data[d].figures.price && data[d].figures.price * 1 > 10000 && data[d].figures.price * 1 < 1000000000) {
                sums.price.sum = sums.price.sum + data[d].figures.price * 1
                sums.price.count++
            }
            if (data[d].figures.rent && data[d].figures.rent * 1 > 100 && data[d].figures.rent * 1 < 1000000000) {
                sums.rent.sum = sums.rent.sum + data[d].figures.rent * 1
                sums.rent.count++
            }
            if (data[d].figures.price && data[d].figures.price * 1 > 10000 && data[d].figures.price * 1 < 1000000000 &&
                data[d].figures.rent && data[d].figures.rent * 1 > 100 && data[d].figures.rent * 1 < 1000000000 &&
                data[d].figures.yield && data[d].figures.yield * 1 > 2 && data[d].figures.yield * 1 < 30) {
                sums.yield.sum = sums.yield.sum + data[d].figures.yield * 1
                sums.yield.count++
            }
        }
        sums.price.avg = sums.price.sum / sums.price.count
        sums.rent.avg = sums.rent.sum / sums.rent.count
        sums.yield.avg = sums.yield.sum / sums.yield.count
        resolve(sums) 
    })
}


async function brochureQueryMongoliser(data)
{
    let  mong = {'$and': []}
    for(const [key, value] of Object.entries(data)){
        if(Array.isArray(value) && value[0]){
            mong['$and'].push(await brochureArrayMongoliser(key, value))
        }
        else if(key == 'maxPrice' && value){
            mong['$and'].push({'figures.price': {'$lte': value * 1}})
        }
        else if(key == 'minPrice' && value){
            mong['$and'].push({'figures.price': {'$gte': value * 1}})
        }
        else if(key == 'dateCreatedStart' && value){
            mong['$and'].push({'meta.dateCreated': {'$gte': value}})
        }
        else if(key == 'dateCreatedEnd' && value){
            mong['$and'].push({'meta.dateCreated': {'$lte': value}})
        }
        else if(key == 'coords' && value){
            mong['$and'].push({'base.loc': {'$geoWithin': {'$centerSphere': [[value.longitude*1, value.latitude*1], value.miles*1/3959]}}})
        }
    }
    if(!mong['$and'][0]){
        mong = ''
    }
    return(mong)
}

async function lRegQueryMongoliser(data)
{
    let  mong = {'$and': []}
    for(const [key, value] of Object.entries(data)){
        if(Array.isArray(value) && value[0]){
            mong['$and'].push(await brochureArrayMongoliser(key, value))
        }
        else if(key == 'Title_Number' && value){
            mong['$and'].push({'Title Number': `${value}`})
        }
        else if(key == 'Company_Registration_No_1' && value){
            mong['$and'].push({'Company Registration No 1':`${value}`})
        }
        else if(key == 'Proprietor_Name_1' && value){
            mong['$and'].push({'Proprietor Name (1)': new RegExp(value.toUpperCase())})
        }
    }
    if(!mong['$and'][0]){
        mong = ''
    }
    return(mong)
}

async function brochureArrayMongoliser(key, value)
{
    let mongoloid = {'$or': []}
    for(var v in value){
        if(key == 'sector'){
            mongoloid['$or'].push({'sectors': {'$elemMatch': {'sector':`${value[v]}`}}})
        }
        else if(key == 'subsectors'){
            mongoloid['$or'].push({'subsectors': {'$elemMatch': {'subSector':`${value[v]}`}}})
        }
        else if(key == 'agency'){
            mongoloid['$or'].push({'agencies': {'$elemMatch': {'agency':`${value[v]}`}}})
        }
        else if(key == 'region'){
            mongoloid['$or'].push({"base.region": `${value[v]}`})
        }
        else if(key == 'tenants'){
            mongoloid['$or'].push({'tenants': {'$elemMatch': {'tenant': new RegExp(value[v])}}})
        }
        else if(key == '_id'){
            mongoloid['$or'].push({"_id": ObjectId(value[v])} )
        }
    }
    return(mongoloid)
}


module.exports.mongoInsert = mongoInsert
module.exports.mongoQuery = mongoQuery
module.exports.brochureQueryMongoliser = brochureQueryMongoliser
module.exports.lRegQueryMongoliser = lRegQueryMongoliser
module.exports.mongoSums = mongoSums
module.exports.mongoReplace = mongoReplace
module.exports.mongoDelete = mongoDelete