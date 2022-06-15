const getText = require('../../pdf/ExtractText')
const getSector = require('./getSector.js')

const priceSentKeywords = {
    firsttier: {keywords: ["quoting", "commitment"], points:1},
    secondtier: {keywords: ["guide", "stc", "excess", "offers", "for the freehold interest", "for the long leasehold interest",
    "for the llh interest"], points:2},
    thirdtier: {keywords: ["million pounds", "seeking", "price", "asking price",
    "offers in excess of", "our client is seeking", "in the region of", "offers are invited", "instructed to seek offers"], points:3}
}
const priceWordKeywords = {
    superBoost:{keywords: ["£"], points: 10, distance: -1},
    beforePos:{keywords: ["£","excess", "offer", "offers", "seek", "instructed","region","sought"], points: 3, distance: -5},
    beforeNeg:{keywords: ["rent", "annual","income", 'net worth', 'turnover'], points: -2, distance: -5},
    afterNeg:{keywords: ["per annum", "pax", "pa"], points: -2, distance: 5},
    afterPos:{keywords: ["excess", "offer", "offers",'subject', 'contract', 'million'], points: 3, distance: 5},
}

async function getPrice(sentences, text)
{
    return new Promise (async function(resolve, reject)
    {
        try {
            const sentenceScore = []
            let price = null
            //loop through every sentence
            for(var i in sentences){
                let score = 0
                //loop through the tiers
                for(var tier in priceSentKeywords){
                    //loop through all the words in the tier
                    for(var word in priceSentKeywords[tier].keywords){
                        //check if the keyword is in the sentence
                        if(sentences[i].includes(priceSentKeywords[tier].keywords[word])){
                            //add the appropriate score to the sentence's total score
                            score = score + priceSentKeywords[tier].points
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
                for(var tier in priceWordKeywords){
                    //loop through all the words in the tier
                    for(var word in priceWordKeywords[tier].keywords){
                        //loop through the words you want to loop based on distance from subject word
                        let areacheck = ''
                        if(priceWordKeywords[tier].distance < 0){
                            for(k=0;k<Math.abs(priceWordKeywords[tier].distance);k++){
                                areacheck = areacheck + `${words[i+priceWordKeywords[tier].distance + k]} `
                            }
                        }
                        else{
                            for(k=0;k<Math.abs(priceWordKeywords[tier].distance);k++){
                                areacheck = areacheck + `${words[i+k]} `
                            }
                        }
                        try{
                            if(areacheck.includes(priceWordKeywords[tier].keywords[word])){
                                score = score + priceWordKeywords[tier].points
                            }
                        }
                        catch{
                            continue
                        }
                    }
                }
                if(!/\d/.test(words[i])){score = score - 10}
                if(words[i].length > 5) {score = score + 2}
                if(words[i].includes(".")){score = score + 2}
                if(words[i].includes(",")){score = score + 1}
                if(words[i].endsWith("0")){score = score + 1}
                wordScore[words[i]] = score
            }
            //order the word object and take the first one for most likely rent
            const winner = getSector.orderObject(wordScore)[0]
            //if score is too low, just return null.
            if(!winner || !winner [1] || winner[1]<10){
                resolve({name: ['figures', 'price'], data: null})
            }
            //otherwise, allow for rare occasions where rent is for example 1.3m, then replace all non numeric and try to turn into a number
            else{
                let probPrice = winner[0]
                try{
                    if(probPrice.includes('.')){
                        probPrice = probPrice * 1000000
                    }
                    else{
                        probPrice = probPrice.replace(/\D/g,'') * 1
                    }
                    if(probPrice == 0){ 
                    }
                    else{
                        price = probPrice
                    }

                }  
                catch{
                }
            }
            resolve({name: ['figures', 'price'], data: price})
        } catch {
            resolve({name: ['figures', 'price'], data: null})
        }
    })
}


module.exports.getPrice = getPrice