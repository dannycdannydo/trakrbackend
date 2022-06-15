
const subSectorKeywords = {
    "Gyms/Fitness":
    {
        posone: {keywords: ['fitness', 'gym', ], fpagepoints:20, points:1},
        postwo: {keywords: ['bannatyne','sports store', 'pure gym', 'jd gyms', 'dw fitness', 'anytime fitness', 'david lloyd', 'energie group',
        'nuffield health', 'total fitness', 'virgin active','the gym group'], fpagepoints: 0, points:1},
        negone: {keywords:["this is a piece of text"], fpagepoints:0, points:0}
    },
    "Funeral Care":
    {
        posone: {keywords: ['crematorium','funeral home', 'funeral care', 'funeral care', 'co-operative funeralcare'], fpagepoints:20, points:1},
        postwo: {keywords: ["cremations", "funerals", 'funeral', 'cremation'], fpagepoints:0, points:1},
        negone: {keywords:["this is a piece of text"], fpagepoints:0, points:0}
    },
    "Public House":
    {
        posone: {keywords: ['wetherspoon', 'marstons','public house', 'greene king', 'free of tie', 'freehold public house'], fpagepoints:20, points:1},
        postwo: {keywords: ['public house', 'inn'], fpagepoints:0, points:1},
        negone: {keywords:["this is a piece of text"], fpagepoints:0, points:0}
    },
    "Trade Counter":
    {
        posone: {keywords: ['trade counter', 'trade investment', 'trade-counter', 'builders merchant', 'builders merchants', 
        'trading estate', 'trade park'], fpagepoints:20, points:1},
        postwo: {keywords: ['wickes', 'saint-gobain', 'selco', 'jewsons', 'toolstation','screwfix','trade counter', 'travis perkins', 'topps tiles', 'mkm', 
        'trade-counter', 'builders merchant', 'builders merchants'], fpagepoints:0, points:1},
        negone: {keywords: ["retail warehouse", "retail warehousing", "retail park", "open a1", "portfolio"], fpagepoints:-5, points:-5}
    },
    "Car Park":
    {
        posone: {keywords: ['q-park', 'ncp limited','euro car parks', 'indigo park solutions'], fpagepoints:25, points:1},
        postwo: {keywords: ["this is a piece of text"], fpagepoints:0, points:1},
        negone: {keywords: ["retail warehouse", "retail warehousing", "retail park", "office", "offices", "industrial", "warehouse", "distribution",
        "retail", "leisure", "restaurant", "foodstore", " food store", "foodstore", " food store", "supermarket", 
        "convenience store", "convenience", "c-store", "c store", 'business park', 'office park'], fpagepoints:-10, points:-1}
    },
    "Petrol Filling Station":
    {
        posone: {keywords: ["petrol filling station", "pendragon", "esso", "petrol station", "pfs", "texaco", 'forecourt'], fpagepoints:25, points:1},
        postwo: {keywords: ["barber wadlow", "forecourt", "fuel pump", "nozzles", 'motorist', 'motoring', "petrol filling station"], fpagepoints:0, points:1},
        negone: {keywords: ["retail warehouse", "retail warehousing", "retail park", "office", "offices", "industrial", "warehouse", "distribution",
        "retail", "leisure", "restaurant"], fpagepoints:-10, points:-1}
    },
    "Car Showroom":{
        posone: {keywords: ['pendragon', 'dealership', 'jaguar', 'audi', 'volkswagen', 'mercedes', 'citroen', 'volvo', 'honda', 'toyota', 
        'nissan', 'skoda', 'sytner','jardine', 'rybrook','car showroom', 'car supermarket','lookers plc', 'car workshop', 'land rover', 
        'automotive retail'], fpagepoints:35, points:1},
        postwo: {keywords: ['automotive retail', 'dealership', 'car showroom', 'car supermarket', 'car workshop'], fpagepoints:0, points:1},
        negone: {keywords: ['pfs', 'forecourt', 'applegreen', 'rontec','petrol station','petrol filling station'], fpagepoints:0, points:-1}
    },
    "Healthcare":{
        posone: {keywords: ['hospital','healthcare investment','health clinic', 'national health service', 
        'nhs property services', "dentist", "dentists", "health"], fpagepoints:30, points:1},
        postwo: {keywords: ["nhs", "doctor's", "doctor", "surgery", 'healthcare', 'dentist', 'physiotherapist', 'chiropractor'], fpagepoints:0, points:1},
        negone: {keywords: ["this is a piece of text"], fpagepoints:0, points:-1}
    },
    "Convenience Store":{
        posone: {keywords: ["convenience retail", "c-store", "convenience store", "convenience-store", 
    "sainsbury's local", 'tesco express', "co-operative food", "co-op food", 'af blakemore', 'blakemore'], fpagepoints:20, points:1},
        postwo: {keywords: ["convenience retail", "c-store", "convenience store"], fpagepoints:0, points:1},
        negone: {keywords: ['pfs', 'forecourt', 'applegreen', 'rontec','petrol station','petrol filling station', "retail", "industrial", "office", 
        "pfs", "petrol filling station", "automotive", "ground rent", "hotel"], fpagepoints:0, points:-1}
    },
    "Drive Thru":{
        posone: {keywords: ['drive thru', 'drive through', 'drive-thru', 'drive-through'], fpagepoints:20, points:1},
        postwo: {keywords:["mcdonald's", 'kfc', 'costa coffee', 'roadside retail'], fpagepoints:0, points:0},
        negone: {keywords: ["retail", "industrial", "office", "pfs", "petrol filling station", "automotive", "ground rent", "hotel", "supermarket", "foodstore",
        "development potential", "portfolio"], fpagepoints:0, points:-1}
    },
    "Student Accommodation":{
        posone: {keywords: ['student accommodation', 'student living', 'student investment'], fpagepoints:20, points:1},
        postwo: {keywords: ['student', 'university accommodation', 'student accommodation', 'campus', 'vita student', 'student roost', 
    'crm students', 'fresh student living', ], fpagepoints:0, points:1},
        negone: {keywords:['this is a piece of text'], fpagepoints:0, points:-1}
    },
    "Residential":{
        posone: {keywords: ["residential", 'assured shorthold', 'apartments', 'houses', 'apartment'], fpagepoints:20, points:1},
        postwo: {keywords:['2 bed', '1 bed', '3 bed', '2-bed', '1-bed', '3-bed', 'permitted development consent'], fpagepoints:0, points:1},
        negone: {keywords:['student accommodation', 'student living', 'student investment'], fpagepoints:0, points:-1}
    },
    "Nursing Home":{
        posone: {keywords: ['nursing home', 'care home', 'supported living'], fpagepoints:20, points:1},
        postwo: {keywords:['2 bed', '1 bed', '3 bed', '2-bed', '1-bed', '3-bed', 'permitted development consent'], fpagepoints:0, points:1},
        negone: {keywords:['student accommodation', 'student living', 'student investment'], fpagepoints:0, points:-1}
    },
    "Distribution Warehouse":{
        posone: {keywords: ['distribution warehouse', 'distribution facility', 'distribution unit'], fpagepoints:20, points:1},
        postwo: {keywords:['distribution', 'warehouse accommodation', 'logistics'], fpagepoints:0, points:1},
        negone: {keywords:['multi-let', 'multi let'], fpagepoints:0, points:-1}
    },
    "Multi-Let Industrial":{
        posone: {keywords: ['multi-let industrial', 'multi let industrial'], fpagepoints:20, points:1},
        postwo: {keywords:['multi-let industrial', 'multi let industrial'], fpagepoints:0, points:1},
        negone: {keywords:['distribution warehouse', 'distribution facility', 'distribution unit'], fpagepoints:0, points:-1}
    },
    "Out of Town Office":{
        posone: {keywords: ['business park', 'office park', 'out of town office', 'out-of-town office'], fpagepoints:20, points:1},
        postwo: {keywords:["b1", "dda compliant", "office", "offices", "central business district", 
        "reception", "business park", "suspended ceiling", "passenger lifts","grade a", 
        "grade b", "comfort cooling"], fpagepoints:0, points:1},
        negone: {keywords:['city centre', 'town centre', 'city-centre', 'town-centre'], fpagepoints:0, points:-1}
    },
    "Neighbourhood Centre":{
        posone: {keywords: ['neighbourhood retail', 'retail terrace', 'convenience retail', 'local centre', 'anchored'], fpagepoints:20, points:1},
        postwo: {keywords: ["convenience retail", "c-store", "convenience store", 'local parade', 'shopping parade', 'retail parade'], fpagepoints:0, points:1},
        negone: {keywords: ['pfs', 'forecourt', 'applegreen', 'rontec','petrol station','petrol filling station', "retail", "industrial", "office", 
        "pfs", "petrol filling station", "automotive", "ground rent", "hotel"], fpagepoints:0, points:-1}
    },
    "Nursery":{
        posone: {keywords: ['nursery', 'daycare', 'childcare', 'day care', 'day nursery', 'kids allowed', "kid's allowed", 'montessori', 'bumble bees', 'children', 'stepping stones', 'busy bees', 
        'bright horizons', 'monkey puzzle', 'kids planet', 'early years', "mama bears", "mama bear's"], fpagepoints:20, points:1},
        postwo: {keywords:['kids allowed', "kid's allowed", 'montessori', 'bumble bees', 'children', 'stepping stones', 'busy bees', 
    'bright horizons', 'monkey puzzle', 'kids planet', 'early years', "mama bears", "mama bear's"], fpagepoints:0, points:1},
        negone: {keywords: ["this is a piece of text"], fpagepoints:0, points:-1}
    },
}

async function getSubSector(sentences, text)
{
    return new Promise (function(resolve, reject)
    {
        const subSectorPoints = {
            "Gyms/Fitness":0,
            "Funeral Care":0,
            "Public House":0,
            "Trade Counter":0,
            "Car Park":0,
            "Petrol Filling Station":0,
            "Car Showroom":0,
            "Healthcare":0,
            "Convenience Store":0,
            "Drive Thru":0,
            "Student Accommodation":0,
            "Residential":0,
            "Nursing Home":0,
            "Distribution Warehouse":0,
            "Multi-Let Industrial":0,
            "Out of Town Office":0,
            "Neighbourhood Centre":0,
            "Nursery":0,
        }
        let subSectors = []
        try{
            const fpage = sentences[0]
            const remainder = sentences.slice(1)
            //loop through each sector in keywords object
            for(var i in subSectorKeywords){
                //loop through posone, postwo and negone in each sector
                for(var k in subSectorKeywords[i]){
                    //loop through each keywords posone, postwo and negone
                    for(var j in subSectorKeywords[i][k].keywords){
                        //if that keyword is in the front page text, add the corresonding frontpage points
                        if(fpage.includes(subSectorKeywords[i][k].keywords[j])){
                            subSectorPoints[i] = subSectorPoints[i] + subSectorKeywords[i][k].fpagepoints
                        }
                    }
                }
            }
            //loop through each sentence within the remainder
            for(var h in remainder){
                for(var i in subSectorKeywords){
                    //loop through posone, postwo and negone in each sector
                    for(var k in subSectorKeywords[i]){
                        //loop through each keywords posone, postwo and negone
                        for(var j in subSectorKeywords[i][k].keywords){
                            //if that keyword is in the front page text, add the corresponding points
                            if(remainder[h].includes(subSectorKeywords[i][k].keywords[j])){
                                subSectorPoints[i] = subSectorPoints[i] + subSectorKeywords[i][k].points
                            }
                        }
                    }
                }
            }
            //send object to be ordered by number
            const orderedsubSectorPoints = orderObject(subSectorPoints)
            //add the percentage of total points acheived by each sector
            let totalPoints = 0
            for(var o in orderedsubSectorPoints){
                if(orderedsubSectorPoints[o][1] && orderedsubSectorPoints[o][1] > 0){
                    totalPoints = totalPoints + orderedsubSectorPoints[o][1]
                }
            }
            for(var o in orderedsubSectorPoints){
                if(Number.parseFloat(orderedsubSectorPoints[o][1]/totalPoints).toPrecision(2) > 0.15 && orderedsubSectorPoints[o][1] > 3){
                    subSectors.push({subSector: orderedsubSectorPoints[o][0], subSectorConfidence: Number.parseFloat(orderedsubSectorPoints[o][1]/totalPoints).toPrecision(2)})
                }
            }
            if(subSectors.length > 3){
                subSectors = subSectors.slice(0,2)
            }
            resolve({name: ['subsectors'], data: subSectors})
        }
        catch(err){
            console.log(err)
            resolve({name: ['subsectors'], data: []})
        }
        //resolves as null if rubbish
    })
}

module.exports.getSubSector = getSubSector


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