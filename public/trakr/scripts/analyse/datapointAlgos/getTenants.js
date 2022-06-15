const getText = require('../../pdf/ExtractText')

let tenantwordsone = {"One": ['limited', 'ltd', 'plc', 'llp', 'gmbh']}
let tenantwordstwo = {"Two": ['limited liability', 'provident society']}
let tenantwordsthree = {"Three": ['public limited company']}

async function getTenants(text, agency)
{
    return new Promise (async function(resolve, reject)
    {
        try {
            if(agency[0]){
                agency = agency[0].agency
            }
            const words = await getText.getWords(text)
            let tenants = []
            for(i=0;i<words.length - 4;i++){
                for(const [key,value] of Object.entries(tenantwordsone)){
                    //iterate through values in the dict
                    for(j = 0; j < value.length; j++){
                        if(words[i] == value[j]){
                            tenants.push(words[i - 3] + " " + words[i - 2] + " " + words[i - 1] + " " + words[i] + " ")
                        }
                    }
                }
            }
            for(i=0;i<words.length - 6;i++){
                for(const [key,value] of Object.entries(tenantwordstwo)){
                    //iterate through values in the dict
                    for(j = 0; j < value.length; j++){
                        if(words[i] == value[j]){
                            tenants.push(words[i - 5] + " " + words[i - 4] + " " + words[i - 3] + " " + words[i - 2] + " " + words[i - 1] + " " + words[i] + " ")
                        }
                    }
                }
            }
            for(i=0;i<words.length - 7;i++){
                for(const [key,value] of Object.entries(tenantwordsthree)){
                    //iterate through values in the dict
                    for(j = 0; j < value.length; j++){
                        if(words[i] == value[j]){
                            tenants.push(words[i - 6] + words[i - 5] + " " + words[i - 4] + words[i - 3] + " " + words[i - 2] + " " + words[i - 1] + " " + words[i] + " ")
                        }
                    }
                }
            }
            let uniqueTenants = [...new Set(tenants)];
            if(agency[0]){
                for(i=0;i<uniqueTenants.length;i++){
                    if(uniqueTenants[i].includes(agency[0].toLowerCase())){
                        uniqueTenants.splice(i,1)
                    }
                }
            }
            let returnTenants = []
            for(var u in uniqueTenants){
                returnTenants.push({tenant: uniqueTenants[u]})
            }
            resolve(returnTenants)
        } catch {
            resolve([])
        }
    })
}


module.exports.getTenants = getTenants