const getText = require('../../pdf/ExtractText')
const getSector = require('./getSector.js')
const locations = require('../../../lists/locations')
const townsAndCities = locations.townsAndCities
const distractions = locations.distractions
const axios = require('axios')
const _ = require('lodash')
const geocode = require('../../geography/geoCode')
const postcodeGeoCode = require('../../geography/postcodeGeoCode')

async function getLocation(sentences, text)
{
    return new Promise (async function(resolve, reject)
    {
        //postcode regex
        const rx = /(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})/gi;
        //match against full text
        const pCodes = text.match(rx)
        let fullAddress = {
            town: null, 
            region: null,
            postcode: null,
            loc: { type: 'Point', coordinates: null }
        }
        let townAddress = null
        //getTown analyses text and returns most likely town and region as object
        await getTown(sentences, false).then(function (result) {
            townAddress = result
        })
        .catch(function (err) {
            console.log(err)
        })
        //if there are no postcodes found, we try to find a partial address
        //if it's the case, we return the partial address if that is successful, or else the town information.
        if(!pCodes){
            await partialaddress(townAddress, sentences).then(function (result) {
                resolve( {
                    town: result.Town, 
                    region: result.Region,
                    postcode: result.Postcode,
                    loc: { type: 'Point', coordinates: [result.Longitude, result.Latitude] }
                })
                return;
            })
            .catch(function (err) {
                resolve(townAddress)
                return;
            })
        }
        //give priority to first and second pages when looking for a postcode
        let addressPriority = {status: "invalid"}
        for(i=0;i<2;i++){
            //go through 1st and second sentences (or only first if you get succcess there)
            if(sentences[i] && sentences[i].match(rx)){
                //get the address from postcodes.io
                await postcodeGeoCode.postcodeGeoCode(sentences[i].match(rx)[0]).then(function (result) {
                    addressPriority = result
                    if(!addressPriority.fullResult.region){
                        try{
                            addressPriority.fullResult.region = addressPriority.fullResult.country
                        }
                        catch{}
                    }
                    }).catch(function (err) {
                    })
                //if that fails, try google
                if(addressPriority.status == "invalid" && sentences[i] && sentences[i] && sentences[i].match(rx)){
                    await geocode.geocode(sentences[i].match(rx)[0]).then(function (result) {
                    addressPriority = result
                    addressPriority.fullResult.longitude = addressPriority.Longitude
                    addressPriority.fullResult.latitude = addressPriority.Latitude
                    }).catch(function (err) {
                    })
                }
                if(addressPriority.status == "valid"){
                    //check if the rseult returned matches at all with our best guess for the town. If so, resolve with the answer.
                    for(var info in addressPriority.fullResult){
                        try{
                            if(addressPriority.fullResult[info].toLowerCase().includes(townAddress.town.toLowerCase()) || 
                            sentences[i].includes(addressPriority.fullResult[info].toLowerCase())){
                                try{
                                    fullAddress.postcode = addressPriority.fullResult.postcode
                                }
                                catch{}
                                try{
                                    fullAddress.region = addressPriority.fullResult.region
                                }
                                catch{}
                                try{
                                    fullAddress.loc.coordinates = [addressPriority.fullResult.longitude, addressPriority.fullResult.latitude]
                                }
                                catch{}
                                try{
                                    fullAddress.town = townAddress.town
                                }
                                catch{}
                                resolve(fullAddress)
                                return;
                            }
                            //also have to try replacing spaces with dashed. Sometimes people say Stoke-on-Trent, sometimes they say stoke on trent
                            else if(townAddress.town.replace(" ", "-") && addressPriority.fullResult[info].toLowerCase().includes(townAddress.town.replace(" ", "-").toLowerCase())
                            || addressPriority.fullResult[info].replace(" ", "-") && sentences[i].includes(addressPriority.fullResult[info].replace(" ", "-").toLowerCase())){
                                try{
                                    fullAddress.postcode = addressPriority.fullResult.postcode
                                }
                                catch{}
                                try{
                                    fullAddress.region = addressPriority.fullResult.region
                                }
                                catch{}
                                try{
                                    fullAddress.loc.coordinates = [addressPriority.fullResult.longitude, addressPriority.fullResult.latitude]
                                }
                                catch{}
                                try{
                                    fullAddress.town = townAddress.town
                                }
                                catch{}
                                resolve(fullAddress)
                                return;
                            }
                        }
                        catch{}
                    }
                }
            }
        }
        //if all the above fails, take the top scoring postcode and run that through then resolve
        //first turn to an object with counts for frequency of postcode
        let pCodeObject = {}
        for(var pCode in pCodes){
            if(!pCodeObject[pCodes[pCode]]){
                pCodeObject[pCodes[pCode]] = 1
            }
            else{
                pCodeObject[pCodes[pCode]] = pCodeObject[pCodes[pCode]] + 1
            }
        }
        //run through in order of frequency, resolving if we get a match with our suspecting town, else simply resolving with the top result
        const pCoderesults = getSector.orderObject(pCodeObject)
        for(p=0;p<pCoderesults.length;p++){
            let add = await postcodeGeoCode.postcodeGeoCode(pCoderesults[p][0])
            if(add.status == "valid"){
                if(!add.fullResult.region){
                    try{
                        add.fullResult.region = add.fullResult.country
                    }
                    catch{}
                }
                //check if the result returned matches at all with our best guess for the town. If so, resolve with the answer.
                for(var info in add.fullResult){
                    try{
                        if(add.fullResult[info].toLowerCase().includes(townAddress.town.toLowerCase()) ||
                        pCoderesults[p][1] > 4 ||
                        text.includes(add.fullResult[info].toLowerCase())){

                            try{
                                fullAddress.postcode = add.fullResult.postcode
                            }
                            catch{}
                            try{
                                if(add.fullResult.region){
                                    fullAddress.region = add.fullResult.region
                                }
                                else if(add.fullResult.country){
                                    fullAddress.region = add.fullResult.country
                                }
                            }
                            catch{}
                            try{
                                fullAddress.loc.coordinates = [add.fullResult.longitude, add.fullResult.latitude]
                            }
                            catch{}
                            try{
                                fullAddress.town = townAddress.town
                            }
                            catch{}
                            resolve(fullAddress)
                            return;
                        }
                        //also have to try replacing spaces with dashed. Sometimes people say Stoke-on-Trent, sometimes they say stoke on trent
                        else if(townAddress.town.replace(" ", "-") && add.fullResult[info].toLowerCase().includes(townAddress.town.replace(" ", "-").toLowerCase()) ||
                        text.replace(" ", "-") && text.replace(" ", "-").includes(add.fullResult[info].toLowerCase())){
                            try{
                                fullAddress.postcode = add.fullResult.postcode
                            }
                            catch{}
                            try{
                                if(add.fullResult.region){
                                    fullAddress.region = add.fullResult.region
                                }
                                else if(add.fullResult.country){
                                    fullAddress.region = add.fullResult.country
                                }
                            }
                            catch{}
                            try{
                                fullAddress.loc.coordinates = [add.fullResult.longitude, add.fullResult.latitude]
                            }
                            catch{}
                            try{
                                fullAddress.town = townAddress.town
                            }
                            catch{}
                            resolve(fullAddress)
                            return;
                        }
                    }
                    catch{}
                }
            }
        }
        if(townAddress){
            try{
                fullAddress.region = townAddress.region
            }
            catch{}
            try{
                fullAddress.town = townAddress.town
            }
            catch{}
            resolve(fullAddress)
            return;
        }
        resolve(fullAddress)
    })
}

//anaylse the full text to extract most likely town and return as object iwlth corresponding region
//also takes portfolios (via a true portfolioBool parameter) but treats differently, returning all towns and corresponding
//region in an array of arrays
let getTown = async function gettown(sentences, portfolioBool)
{
    return new Promise(async function(resolve, reject)
    {
        let address = {}
        try{
            //map pages contain large amounts or irrelvant town and city words. Remove these
            //by counting occurences of a match against town and city values, anything with more than twenty is removed.
            const probTown = {}
            let count = 0
            for(var s in sentences){
                for(const [key,value] of Object.entries(townsAndCities)){
                    for(j = 0; j < value.length; j++){
                        if(sentences[s].includes(value[j].toLowerCase())){
                            count++
                        }
                    }
                }
                if(s !== 0 && count > 20){
                    sentences.splice(s, 1)
                }
            }
            //bias to the first 200 characters or first two sentences, whichever is smaller.
            let frontpage = null
            let restPages = null
            if(sentences[0].length > 200){
                frontpage = sentences[0].substring(0,200)
            }
            else{
                frontpage = sentences[0]
            }
            if(sentences.length > 1){
                restPages = sentences.slice(1, sentences.length)
            }
            let fPageWords = await getText.getWords(frontpage)
            let restWords = await getText.getWords(restPages.join(" "))
            //loop through the frontpage words
            const sentenceStructure = {
                frontPage: fPageWords,
                rest: restWords
            }
            //loop through all values in the sentenceStructure object and the towns and cities object
            for(var key in sentenceStructure){
                for(var word in sentenceStructure[key]){
                    for(var region in townsAndCities){
                        for(var town in townsAndCities[region]){
                            //set some variable to make things a little easier
                            let actualWord = sentenceStructure[key][word]
                            let checkWord = townsAndCities[region][town]
                            let wordsToCheck =''
                            //some towns have multiple words and we are checking on an exact word match. So throw forward by the length of the checkword
                            for(i=0;i<checkWord.length;i++){
                                wordsToCheck = sentenceStructure[key][word + 1]
                            }
                            if (actualWord == checkWord.toLowerCase() )
                            {
                                let distractionWord = 0
                                //if the word after this has a distraction
                                try{
                                    for(var d of distractions){
                                        for(var e of distractions[d]){
                                            if(sentenceStructure[key][word + 1] == distractions[d][e]){
                                                distractionWord = 1
                                            }
                                        }
                                    }
                                }
                                //catch when we go out of bounds
                                catch{
                                }
                                //cushman and wakefield mess up investments in wakefield deal with it
                                if(checkWord.toLowerCase() == 'wakefield' && (sentenceStructure[key][word - 1] == 'cushman' || sentenceStructure[key][word - 2] == 'cushman')){
                                    distractionWord = 1
                                }
                                if(distractionWord == 0){
                                    //weight front page occurences as 5 times more useful
                                    if(key == "frontPage"){
                                        if(!probTown[checkWord]){
                                            probTown[checkWord] = 5
                                        }
                                        else{
                                            probTown[checkWord] = probTown[checkWord] + 5
                                        }
                                    }
                                    else{
                                        if(!probTown[checkWord]){
                                            probTown[checkWord] = 1
                                        }
                                        else{
                                            probTown[checkWord] = probTown[checkWord] + 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            let returnTown = getSector.orderObject(probTown)
            let returnRegion = null
            let portfolioTowns = []
            if(portfolioBool && returnTown){
                for(r=0;r<returnTown.length;r++){
                    if(returnTown[r][1] > 2){
                        let portfolioRegion = locations.getRegion(returnTown[r][0])
                        portfolioTowns.push({town:returnTown[r][0],region: portfolioRegion})
                    }
                }
                resolve(portfolioTowns)
                return
            }
            else{
                returnTown = returnTown[0][0]
                returnRegion = locations.getRegion(returnTown)
                address = {
                    town: returnTown,
                    region: returnRegion
                }
            }
        }
        catch{
            reject()
        }
        resolve(address)
    })
}


let partialaddress = async function partial_address(address, sentences){
    return new Promise(async function(resolve, reject)
    {
        //common street descriptions required to parse street name
        const partialaddroadnames = ['road', 'street', 'way', 'avenue', 'drive', 'drive', 'lane', 'grove', 'gardens', 'house', 'hall', 'manor', 'lodge', 'new',
        'place', 'circus', 'crescent', 'bypass', 'close', 'square', 'hill', 'mews', 'vale', 'end', 'rise', 'row', 'corner', 'broadway']
        //strip out anything that is found in and around the address, usually front page
        const partialaddstrip = ['retail', 'investment', 'opportunity']
        const substrings = require('common-substrings')
        let testcases = []
        let stagetwo = []
        let words = []
        let result = ''
        //take out sentences that include our probable town
        for(i=0;i<sentences.length;i++){
            if(address && address.town && sentences[i].includes(address.town.toLowerCase())){
                testcases.push(sentences[i])
            }
        }
        //wordify each sentence
        for(i=0;i<testcases.length;i++){
            word = await getText.getWords(testcases[i])
            words.push(word)
        }
        //check each word in each testcase to see if it is a common street description word
        //if it is, take it and 3 words before it
        for(i=0;i<words.length;i++){
            for(j=3;j<words[i].length;j++){
                for(const word of partialaddroadnames){
                    if(words[i][j] == word){
                        let string = `${words[i][j - 3]} ${words[i][j - 2]} ${words[i][j - 1]} ${words[i][j]}`
                        stagetwo.push(string)
                    }
                }
            }
        }
        try{
            let check = 0
            //we now have array of potential addresses. Most likely to be the address is the one that is repeated exactly most often.
            //below checks for the most repeated substring in all the strings
            let resulttosort = substrings(stagetwo, {
                minOccurrence: 3,
                minLength: 10,
            });
            //if no string occurs 3 or more times, then reduce the criteria to 1
            if (resulttosort.length < 1){
                resulttosort = substrings(stagetwo, {
                    minOccurrence: 1,
                    minLength: 10,
                });
                check++
            }
            let resultsorted = []
            //sort by weight and pick the 'heaviest'
            if(check == 0){
                resultsorted = _.sortBy(resulttosort, ['weight']);
                result = resultsorted[resultsorted.length - 1]['name']
            }
            else{
                //if the criteria was reduced to less that 1 matches, pick to one closest to front of brochure to bias front pages
                resultsorted = resulttosort[0];
                if(resultsorted){
                    result = resultsorted['name']
                }
            }
            //clean up the text
            for(i=0; i<partialaddstrip.length; i++){
                result = result.replace(partialaddstrip[i], "")
                result = result.trim()
                result = result.replace(/\W/g, '')
            }
            //add it to a string with town name and united kingdom
            if (address && address.town) {
                result = result + ", " + address.town + ", United Kingdom"
            } else {
                result = result + ", United Kingdom"
            }
            result = titleCase(result)
        }
        catch(err){
            console.log(err)
            reject()
        }
        var config = require('../../../../../config/config')
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${result}&key=${config.gmapApiKey}`
        let returnresult = {}
        let pcode = ''
        let lat = null
        let lng = null
        try{
            await axios.get(url)
            .then(async function axiossend(response){
                if(response["status"] == 200){
                    let fmtadd = ''
                    let latres = null
                    let lngres = null
                    try{
                        fmtadd = response["data"]["results"][0]["formatted_address"]
                    }
                    catch{}
                    try{
                        for(r=0;r<response["data"]["results"][0]["address_components"].length;r++){
                            if(response["data"]["results"][0]["address_components"][r]["types"] == "postal_code"){
                                pcode = response["data"]["results"][0]["address_components"][r]["long_name"]
                            }
                        }
                    }
                    catch{}
                    try{
                        latres = response["data"]["results"][0]["geometry"]["location"]["lat"]
                        lngres = response["data"]["results"][0]["geometry"]["location"]["lng"]
                    }
                    catch{}
                    if(latres){
                        lat = latres
                    }
                    if(lngres){
                        lng = lngres
                    }
                    returnresult = {
                        FormattedAddress:fmtadd,
                        Town:address.town,
                        Region:address.region,
                        Postcode:pcode, 
                        Latitude:lat, 
                        Longitude:lng,
                    }             
                }
                else{
                    reject()
                }
            })
        }
        catch(err){
            reject()
        }
        resolve(returnresult)
    })
}

function titleCase(str) {
    try{
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
    }
    catch{
        return null
    }
    // Directly return the joined string
    return splitStr.join(' ');
 }


 async function getLocationPortfolio(sentences, text)
 {
     return new Promise (async function(resolve, reject)
     {
         //postcode regex
        const rx = /(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})/gi;
        //match against full text
        const pCodes = Unique(text.match(rx))
        let fullAddress = []
        let townAddress = null
        //getTown analyses text and returns most likely town and region as object
        await getTown(sentences, true).then(function (result) {
            townAddress = result
        })
        .catch(function (err) {
            console.log(err)
        })
        if(!pCodes){
            for(var i in townAddress){
                let tempAddressPartial = {}
                try{
                    await partialaddress(townAddress[i], sentences).then(function (result) {
                        tempAddressPartial.town = townAddress[i].town
                        tempAddressPartial.region = result.Region
                        tempAddressPartial.postcode = result.Postcode
                        tempAddressPartial.latitude = result.Latitude
                        tempAddressPartial.longitude = result.Longitude
                        fullAddress.push(tempAddressPartial)
                    })
                    .catch(function (err) {
                    })
                }
                catch{}
            }
            resolve(fullAddress)
            return
        }
        //run through all pcodes and add into our array of addresses
        for(p in pCodes){
            let add = await postcodeGeoCode.postcodeGeoCode(pCodes[p])
            if(addressPriority.status == "invalid"){
                addressPriority = await geocode.geocode(sentences[i].match(rx)[0])
                addressPriority.fullResult.longitude = addressPriority.Longitude
                addressPriority.fullResult.latitude = addressPriority.Latitude
            }
            if(add.status == "valid"){
                let tempAddHolder = {postcode:null, region:null, latitude: null, longitude: null, town:null}
                try{
                    tempAddHolder.postcode = add.fullResult.postcode
                }
                catch{}
                try{
                    if(add.fullResult.region){
                        tempAddHolder.region = add.fullResult.region
                    }
                    else if(add.fullResult.country){
                        tempAddHolder.region = add.fullResult.country
                    }
                }
                catch{}
                try{
                    tempAddHolder.loc.type = "Point"
                    tempAddHolder.loc.coordinates = [add.fullResult.longitude, add.fullResult.latitude]
                }
                catch{}
                try{
                    let bestFitTown = findTownPortfolio(add.fullResult)
                    tempAddHolder.town = bestFitTown
                }
                catch{}
                fullAddress.push(tempAddHolder)
            }
        }
        resolve(fullAddress)
     })
 }

 //THe postcodes.io API returns multiple different things that could be the best description of 'Town'
 //No single one is best to use in any one situation
 //search for a few of them against our town list. 
 //if not, use parish
 function findTownPortfolio(addressArray){
     //narrow down to the town related components
     try{
        let tempArray = {
            region: addressArray.region,
            parish: addressArray.parish,
            admin_district: addressArray.admin_district,
            admin_ward: addressArray.admin_ward,
            ced: addressArray.ced
        }
        //loop through the address
        for(var entry in tempArray){
            for(var town in townsAndCities[tempArray.region]){
                if(townsAndCities[tempArray.region][town].includes(tempArray[entry])){
                    return(townsAndCities[tempArray.region][town])
                }
                else{return(tempArray.parish)}
            }
        }
     }
     catch{
         return(addressArray.region)
     }
 }

//return unique values in array
 function Unique(array) {
     let uniqueArray= null
    try{
        let uniqueArray = array.filter((v, i, a) => a.indexOf(v) === i); 
    }
    catch{}
    return(uniqueArray)
}

module.exports.getLocation = getLocation
module.exports.getLocationPortfolio = getLocationPortfolio