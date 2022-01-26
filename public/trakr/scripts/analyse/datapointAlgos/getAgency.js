const theAgencies = require('../../../lists/theAgencies')
const Agencies = theAgencies.theAgencies


async function getAgency(sentences, text)
{
    return new Promise (async function(resolve, reject)
    {
        let agencyList = {}
        //loop through the agencies object
        for(const [key,value] of Object.entries(Agencies)){
            //loop through values in the agencies object
            for(i = 0; i < value.length; i++){
                //search for instances of the value
                let re = new RegExp(value[i],'g');
                //check against text string
                if(text.match(re)){
                    agencyList[key] = (text.match(re).length)
                }
            }
        }
        //order agency by frequency of each entry
        let agency = []
        try{
            for(const [key] of Object.entries(agencyList)){
                agency.push({"agency": key})
            }
        }
        catch{
        }
        resolve({name: ['agencies'], data: agency})        
    })
}


module.exports.getAgency = getAgency