const { postFile } = require('../../scripts/api/post')
const geocode = require('../../scripts/geography/geocode')

async function analyse(attachments, aList){
    return new Promise(async function(resolve, reject)
    {
        let analysis = {result: "failed"}
        if(!aList){
            analysis.result = "failed"
            reject(analysis)
        }
        for (var i in attachments) {
            if(analysis.result != "success") {
                try {
                    if (aList.includes(attachments[i].filename)) {
                        let temp = {}
                        try{
                            temp = await postFile('https://brochuresearch.herokuapp.com', '/api/trakrAPI/', {}, {buffer: attachments[i].content}, attachments[i].filename)
                        }
                        catch(e){
                            console.log(e)
                        }
                        let result = temp.data
                        if (result.result != 'failed') {
                            analysis.result = "success"
                            if(result.base && result.base && result.base.loc  && result.base.loc.coordinates){
                                analysis.coordinates = result.base.loc.coordinates
                                let add = await geocode.geocode(analysis.coordinates[1] + ", " + analysis.coordinates[0])
                                analysis.address = add.address
                            }
                            if(result.sectors){
                                analysis.sectors = result.sectors
                            }
                            if(result.subsectors){
                                analysis.subsectors = result.subsectors
                            }
                            if(result.figures && result.figures.rent){
                                analysis.rent = result.figures.rent
                            }
                            if(result.figures && result.figures.price){
                                analysis.price = result.figures.price
                            }
                            if(result.figures && result.figures.yield){
                                analysis.yield = result.figures.yield
                            }
                        }
                        else{
                            analysis.result = "failed"
                        }
                    }
                }
                catch{
                    analysis.result = "failed"
                    reject(analysis)
                }
            }
        }
        resolve(analysis)
    })
}

module.exports.analyse = analyse