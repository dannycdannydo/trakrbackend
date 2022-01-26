const sectorKeywords = {
    Industrial:
    {
        posone: {keywords: ["industrial", "warehouse", "distribution", "trade counter", "trading estate"], fpagepoints:20, points:1},
        postwo: {keywords: ["eaves", "industrial", "shed", "business park", "portal frame", "phase electricity"], fpagepoints: 0, points:1},
        negone: {keywords:["this is a piece of text"], fpagepoints:0, points:0}
    },
    Offices:
    {
        posone: {keywords: ["office", "offices", "city centre office"], fpagepoints:20, points:1},
        postwo: {keywords: ["b1", "dda compliant", "office", "offices", "central business district", 
        "reception", "business park", "suspended ceiling", "passenger lifts","grade a", 
        "grade b", "comfort cooling", "city centre"], fpagepoints:0, points:1},
        negone: {keywords:["this is a piece of text"], fpagepoints:0, points:0}
    },
    "Retail Warehouse":
    {
        posone: {keywords: ["retail warehouse", "bulky goods", "retail park", "retail park", "open a1"], fpagepoints:20, points:1},
        postwo: {keywords: ["bulky goods", "retail park", "retail park", "open a1", "retail warehouse"], fpagepoints:0, points:1},
        negone: {keywords: ["retail investment", "shop", "high street", "store", "prime", "prime pitch", "prime retail pitch", "portfolio"], fpagepoints:-10, points:0}
    },
    "Retail and Leisure":
    {
        posone: {keywords: ["retail", "leisure", "restaurant"], fpagepoints:20, points:1},
        postwo: {keywords: [ "retail", "leisure", "a1", "a3", "prime pitch", "prime retail pitch", "public house",
        "gym", "gymnasium", "cinema", 'fitness', "health club", "sports centre"], fpagepoints:0, points:1},
        negone: {keywords: ["retail warehouse", "retail warehousing", "retail park", "bulky goods", "portal frame", "portfolio"], fpagepoints:-5, points:-5}
    },
    Foodstore:
    {
        posone: {keywords: ["foodstore", " food store", "foodstore", " food store", "supermarket", 
        "convenience store", "convenience", "c-store", "c store"], fpagepoints:20, points:1},
        postwo: {keywords: ["foodstore", "supermarket", "convenience store", "c-store", "c store", "aldi", "asda", "booths", 
        "budgens", "co-op", "co-operative", "haldens","heron", "iceland", "lidl", 
        "marks and spencer", "marks & spencer", "mccolls", "mccoll's", "morrisons", "m-local", "sainsburys", 
        "sainsbury's", "spar", "tesco", "waitrose", "lidl"], fpagepoints:0, points:1},
        negone: {keywords: ["multi-let", "mixed use", "retail terrace", "petrol filling station", 
        "petrol station", "pfs", "portfolio"], fpagepoints:-10, points:-1}
    },
    Automotive:{
        posone: {keywords: ["car showroom", "car supermarket", "automotive", "petrol", "petrol filling station", "petrol station", "pfs", "dealership", 
        "car workshop"], fpagepoints:35, points:1},
        postwo: {keywords: ["car showroom", "petrol filling station", "pendragon", "esso", "audi", "porsche", "petrol station", "pfs", "dealership", "peugeot", "nissan", 
        "honda", "rontec", "land rover", "volvo", "mercedes", "volkswagen", "texaco", "vehicle maintenance", "barber wadlow", 
        "forecourt", "covenience-store", "c-store", "fuel pump", "nozzles", 'motorist', 'motoring'], fpagepoints:0, points:1},
        negone: {keywords: ["foodstore", "portfolio"], fpagepoints:0, points:-1}
    },
    "Development Opportunity":{
        posone: {keywords: ["development", "redevelopment", "development site"], fpagepoints:30, points:1},
        postwo: {keywords: ["planning permission", "vacant possession", "conversion potential", "variety of uses", "subject to planning", 
        "residential development"], fpagepoints:0, points:1},
        negone: {keywords: ["fully let", "tenanted", "portfolio"], fpagepoints:0, points:-1}
    },
    "Ground Rent":{
        posone: {keywords: ["ground rent"], fpagepoints:20, points:1},
        postwo: {keywords: ["freehold ground rent", "apartments", "gdv ratio", "ground rent", "long income", 
        "years purchase", "assignment fees"], fpagepoints:0, points:1},
        negone: {keywords: ["fully let", "industrial", "office", "portfolio"], fpagepoints:0, points:-1}
    },
    Hotel:{
        posone: {keywords: ["hotel", "boutique", "bed & breakfast", "travelodge", "jury's inn", 
        "jurys inn", "holiday inn", "shearings group", "hilton", "radisson", "park inn", "premier inn", "ramada"], fpagepoints:20, points:1},
        postwo: {keywords: ["en-suite", "guest rooms", "reception", "house keeping", "well-appointed", "three star", "four star", 
        "five star", "restaurant", "meeting rooms", "boutique", "bed & breakfast", "travelodge", "jury's inn", 
        "jurys inn", "holiday inn", "shearings group", "hilton", "radisson", "park inn", "premier inn", "ramada"], fpagepoints:0, points:1},
        negone: {keywords: ["retail", "industrial", "office", "pfs", "petrol filling station", "automotive", "ground rent", "hotel", "supermarket", "foodstore",
        "development potential", "portfolio"], fpagepoints:0, points:-1}
    },
    Alternative:{
        posone: {keywords: ["alternative", "private rented", "residential", "higher education", "apartment", "school",
        "public sector", "renewable energy investment", "student accommodation",
        "student housing", "self-storage", "healthcare", "assisted living", "nursing home", "care home",'nursery', 'daycare', 'childcare', 'day care', 'day nursery',
        "kid's allowed", 'kids allowed', 'montessori', 'bumble bees', 'children', 'stepping stones', 'busy bees', 
        'bright horizons', 'monkey puzzle', 'kids planet', 'early years', "mama bear's", "mama bears"], fpagepoints:20, points:1},
        postwo: {keywords:["this is a piece of text"], fpagepoints:0, points:0},
        negone: {keywords: ["retail", "industrial", "office", "pfs", "petrol filling station", "automotive", "ground rent", "hotel", "supermarket", "foodstore",
        "development potential", "portfolio"], fpagepoints:0, points:-1}
    },
    Portfolio:{
        posone: {keywords: ["portfolio", "project", "individual lots from", "available individually"], fpagepoints:30, points:0},
        postwo: {keywords: ["portfolio", "individual lots from", "available individually"], fpagepoints:0, points:10},
        negone: {keywords:["this is a piece of text"], fpagepoints:0, points:0}
    },
    "Mixed Use":{
        posone: {keywords: ["mixed use"], fpagepoints:30, points:7},
        postwo: {keywords:["this is a piece of text"], fpagepoints:0, points:0},
        negone: {keywords:["this is a piece of text"], fpagepoints:0, points:0}
    },
}


async function getSector(sentences, text)
{
    return new Promise (function(resolve, reject)
    {
        let sectors = []
        const sectorPoints = {
            Industrial:0,
            Offices:0,
            "Retail Warehouse":0,
            "Retail and Leisure":0,
            Foodstore:0,
            Automotive:0,
            "Development Opportunity":0,
            "Ground Rent":0,
            Hotel:0,
            Alternative:0,
            Portfolio:0,
            "Mixed Use":0
        }
        try{
            const fpage = sentences[0]
            const remainder = sentences.slice(1)
            //loop through each sector in keywords object
            for(var i in sectorKeywords){
                //loop through posone, postwo and negone in each sector
                for(var k in sectorKeywords[i]){
                    //loop through each keywords posone, postwo and negone
                    for(var j in sectorKeywords[i][k].keywords){
                        //if that keyword is in the front page text, add the corresonding frontpage points
                        if(fpage.includes(sectorKeywords[i][k].keywords[j])){
                            sectorPoints[i] = sectorPoints[i] + sectorKeywords[i][k].fpagepoints
                        }
                    }
                }
            }
            //loop through each sentence within the remainder
            for(var h in remainder){
                for(var i in sectorKeywords){
                    //loop through posone, postwo and negone in each sector
                    for(var k in sectorKeywords[i]){
                        //loop through each keywords posone, postwo and negone
                        for(var j in sectorKeywords[i][k].keywords){
                            //if that keyword is in the front page text, add the corresonding frontpage points
                            if(remainder[h].includes(sectorKeywords[i][k].keywords[j])){
                                sectorPoints[i] = sectorPoints[i] + sectorKeywords[i][k].points
                            }
                        }
                    }
                }
            }
            //send object to be ordered by number
            const orderedSectorPoints = orderObject(sectorPoints)
            //add the percentage of total points acheived by each sector
            let totalPoints = 0
            for(var o in orderedSectorPoints){
                if(orderedSectorPoints[o][1] && orderedSectorPoints[o][1] > 0){
                    totalPoints = totalPoints + orderedSectorPoints[o][1]
                }
            }
            for(var o in orderedSectorPoints){
                if(Number.parseFloat(orderedSectorPoints[o][1]/totalPoints).toPrecision(2) > 0.15){
                    sectors.push({sector: orderedSectorPoints[o][0], sectorConfidence: Number.parseFloat(orderedSectorPoints[o][1]/totalPoints).toPrecision(2)})
                }
            }
            if(sectors.length > 3){
                sectors = sectors.slice(0,2)
            }
            resolve({name: ['sectors'], data: sectors})
        }
        catch(err){
            console.log(err)
            resolve({name: ['sectors'], data: null})
        }
        //resolves as null if rubbish
        
    })
}

//takes an object with only numbers for elements and returns as ordered from greatest to least
function orderObject(object){
    var sortedArray = [];
    for (var o in object) {
        sortedArray.push([o, object[o]]);
    }
    sortedArray.sort(function(a, b) {
        return b[1] - a[1];
    });
    return(sortedArray)
}

module.exports.getSector = getSector
module.exports.orderObject = orderObject