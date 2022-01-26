const interested = ["sector","rent","price","yield","agency","town","region","postcode"]

async function getFilename(form,text)
{
    return new Promise (async function(resolve, reject)
    {
        let filename = ''
        let encodedText = await textEncode(text)
        let encodedForm = await formEncode(form)
        filename = filename + encodedForm + "&£$" + encodedText
        resolve(filename)
    })
}

async function textEncode(text){
    let textEncodeString = ''
    for(i=10;i>0;i--){
        try{
            if(text[Math.floor(text.length/i)]){
                textEncodeString = textEncodeString + text[Math.floor(text.length/i)]
                }
        }
        catch{}
    }
    return(textEncodeString)
}


async function formEncode(form)
{
    let formEncodeString = ''
    let returnString = ''
    if(form.base.town){formEncodeString = formEncodeString + form.base.town}
    if(form.base.region){formEncodeString = formEncodeString + form.base.region}
    if(form.base.postcode){formEncodeString = formEncodeString + form.base.postcode}
    if(form.sectors[0]){
        for(var s in form.sectors){
            formEncodeString = formEncodeString + form.sectors[s].sector
        }
    }
    formEncodeString = formEncodeString.replace(/[^0-9a-zA-Z]/g, '')
    for(i=0;i<formEncodeString.length;i++){
        try{
            if(i % 2){
                returnString = returnString + formEncodeString[i]
            }
        }
        catch{}
    }
    if(returnString.length > 10){
        returnString = returnString.slice(0,10)
    }
    return(returnString)
}

module.exports.getFilename = getFilename