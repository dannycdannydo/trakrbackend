const getText = require('../../pdf/ExtractText')
const getSector = require('./getSector.js')

const rentSentKeywords = {
    firsttier: {keywords: ["rent passing", "income"], points:1},
    secondtier: {keywords: ["per annum", "pa", "p.a","pax", "initial rent", "net rent", "gross rent", "net income", "gross income"], points:2},
    thirdtier: {keywords: ["total rent", "total passing rent", "total rent passing", "current passing rent", "at a rent of",
    "current rent of", "at a passing rent of","total rental income","combined income","combined rental income", 
    "produces a total rent", "produces a total income", "producing an income of", "total income",
    "total net income", "producing a total income of", "producing a net income of", "producing a gross income of", 
    "annual rent", "net income approx"], points:3}
}
const rentWordKeywords = {
    superBoost:{keywords: ["£"], points: 10, distance: -1},
    goodBoost:{keywords: ["pa", "pax", "p.a", "per"], points: 3, distance: 1},
    beforePos:{keywords: ["rent", "total", "income", "produces", "producing", "rental", "net", "initial", "annual"], points: 3, distance: -5},
    beforeNeg:{keywords: ["price", "seeking", "offers", "excess", "seek", "offer", "ground", "payaway"], points: -3, distance: -5},
    afterNeg:{keywords: ["subject to contract", "stc", "contract"], points: -3, distance: 5},
    afterPos:{keywords: ["per annum", "pax", "pa", "p.a", "p.a.", "psf", "per sq ft", "per square foot"], points: 5, distance: 7},
    
}

async function getRent(sentences, text)
{
    return new Promise (async function(resolve, reject)
    {
        try {
            const sentenceScore = []
            let rent = null
            //loop through every sentence
            for(var i in sentences){
                let score = 0
                //loop through the tiers
                for(var tier in rentSentKeywords){
                    //loop through all the words in the tier
                    for(var word in rentSentKeywords[tier].keywords){
                        //check if the keyword is in the sentence
                        if(sentences[i].includes(rentSentKeywords[tier].keywords[word])){
                            //add the appropriate score to the sentence's total score
                            score = score + rentSentKeywords[tier].points
                        }
                    }
                }
                //push the score out to the array
                sentenceScore.push(score)
            }
            //the most likely sentence is the highest scorer
            const sentencewinner = sentences[sentenceScore.indexOf((Math.max.apply(Math, sentenceScore)))]
            //wordify that sentence
            const words = await getText.getWords(sentencewinner)
            const wordScore = {}
            //loop through each word
            for(i=0;i<words.length;i++){
                let score = 0
                //loop through the tiers
                for(var tier in rentWordKeywords){
                    //loop through all the words in the tier
                    for(var word in rentWordKeywords[tier].keywords){
                        //loop through the words you want to loop based on distance from subject word
                        let areacheck = ''
                        if(rentWordKeywords[tier].distance < 0){
                            for(k=0;k<Math.abs(rentWordKeywords[tier].distance);k++){
                                areacheck = areacheck + `${words[i+rentWordKeywords[tier].distance + k]} `
                            }
                        }
                        else{
                            for(k=0;k<Math.abs(rentWordKeywords[tier].distance);k++){
                                areacheck = areacheck + `${words[i+k]} `
                            }
                        }
                        try{
                            if(areacheck.includes(rentWordKeywords[tier].keywords[word])){
                                score = score + rentWordKeywords[tier].points
                            }
                        }
                        catch{
                            continue
                        }
                    }
                }
                if(!/\d/.test(words[i])){score = score - 10}
                if(words[i].length < 5) {score = score - 10}
                if(words[i].includes(",")){score = score + 2}
                if(words[i].endsWith("0")){score = score + 1}
                wordScore[words[i]] = score
            }
            //order the word object and take the first one for most likely rent
            const winner = getSector.orderObject(wordScore)[0]
            //if score is too low, just return null.
            if(winner && winner[1] && winner[1]<10){
                resolve({name: ['figures', 'rent'], data: null})
            }
            //otherwise, allow for rare occasions where rent is for example 1.3m, then replace all non numeric and try to turn into a number
            else{
                try{
                    let prob_rent = winner[0]
                    if(prob_rent.includes('.')){
                        prob_rent = prob_rent.slice(0,prob_rent.indexOf('.'))
                    }
                    prob_rent = prob_rent.replace(/\D/g,'') * 1
                    if(prob_rent == 0){
                    }
                    else{
                        rent = prob_rent
                    }

                }  
                catch{
                }
            }
            resolve({name: ['figures', 'rent'], data: rent})
        } catch {
            resolve({name: ['figures', 'rent'], data: null})
        }
    })
}


module.exports.getRent = getRent