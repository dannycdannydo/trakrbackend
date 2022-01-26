const getText = require('../../pdf/ExtractText')
const getSector = require('./getSector.js')

const yieldSentKeywords = {
    firsttier: {keywords: ["yield profile"], points:1},
    secondtier: {keywords: ["purchaser's costs", "purchasers costs", "reflects", "yield"], points:2},
    thirdtier: {keywords: ["purchase at this level", "reflects a yield", "reflecting a net initial yield", "reflects a net initial yield",
    "reflect's a net initial yield", "net initial yield", "net yield", "initial yield", "niy", "reflects a niy", "reflect's a niy"], points:3}
}
const yieldWordKeywords = {
    superBoost:{keywords: ["yield of"], points: 5, distance: -2},
    beforePos:{keywords: ["net", "initial", "yield", "reflects"], points: 3, distance: -5},
    beforeNeg:{keywords: ["purchase", "costs"], points: -2, distance: -5},
}

async function getYield(sentences, text)
{
    return new Promise (async function(resolve, reject)
    {
        const sentenceScore = []
        let yield = null
        //loop through every sentence
        for(var i in sentences){
            let score = 0
            //loop through the tiers
            for(var tier in yieldSentKeywords){
                //loop through all the words in the tier
                for(var word in yieldSentKeywords[tier].keywords){
                    //check if the keyword is in the sentence
                    if(sentences[i].includes(yieldSentKeywords[tier].keywords[word])){
                        //add the appropriate score to the sentence's total score
                        score = score + yieldSentKeywords[tier].points
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
            for(var tier in yieldWordKeywords){
                //loop through all the words in the tier
                for(var word in yieldWordKeywords[tier].keywords){
                    //loop through the words you want to loop based on distance from subject word
                    let areacheck = ''
                    if(yieldWordKeywords[tier].distance < 0){
                        for(k=0;k<Math.abs(yieldWordKeywords[tier].distance);k++){
                            areacheck = areacheck + `${words[i+yieldWordKeywords[tier].distance + k]} `
                        }
                    }
                    else{
                        for(k=0;k<Math.abs(yieldWordKeywords[tier].distance);k++){
                            areacheck = areacheck + `${words[i+k]} `
                        }
                    }
                    try{
                        if(areacheck.includes(yieldWordKeywords[tier].keywords[word])){
                            score = score + yieldWordKeywords[tier].points
                        }
                    }
                    catch{
                        continue
                    }
                }
            }
            if(!/\d/.test(words[i])){score = score - 10}
            if (words[i].match(/[a-z]/i)){score = score - 10}
            if(words[i].length < 7) {score = score + 1}
            try{
                if(words[i+1].includes("%")){score = score + 10}
            }
            catch{}
            if (words[i].includes(".")){score++;}
            if (words[i].endsWith(".00")){score += 1;}
            if (words[i].endsWith(".25")){score += 1;}
            if (words[i].endsWith(".50")){score += 1;}
            if (words[i].endsWith(".75")){score += 1;}
            wordScore[words[i]] = score
        }
        //order the word object and take the first one for most likely rent
        const winner = getSector.orderObject(wordScore)[0]
        //if score is too low, just return null.
        if(!winner || !winner [1] || winner[1]<10){
            resolve({name: ['figures', 'yield'], data: null})
        }
        //otherwise, allow for rare occasions where rent is for example 1.3m, then replace all non numeric and try to turn into a number
        else{
            let probYield = winner[0]
            try{
                probYield = probYield.replace(/[a-z]/g,'')
                probYield = parseFloat(probYield)
                if(probYield == 0){
                }
                else{
                    yield = probYield
                }

            }  
            catch{
            }
        }
        resolve({name: ['figures', 'yield'], data: yield})
    })
}


module.exports.getYield = getYield