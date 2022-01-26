const fs = require('fs')
const pdf = require('pdf-parse')
var natural = require('natural');
var wordtokenizer = new natural.TreebankWordTokenizer();
var sentencetokenizer = new natural.SentenceTokenizer()

async function getText(file)
{
    return new Promise (function(resolve, reject)
    {
        let options = {
            pagerender: render_page
        }
        const pdfdata = {text:null,sentences:null,date:null}
        let dataBuffer = file
        let date = null
        ;(async () => {
            let data = await pdf(dataBuffer, options)
            if(data.metadata){
                try{
                    if(data.metadata['_metadata']['xmp:createdate']){
                        date = data.metadata['_metadata']['xmp:createdate']
                    }
                    else if(data.metadata['_metadata']['xmp:metadatadate']){
                        date = data.metadata['_metadata']['xmp:metadatadate']
                    }
                    else if(data.metadata['_metadata']['xap:createdate']){
                        date = data.metadata['_metadata']['xap:createdate']
                    }
                    else if(data.metadata['_metadata']['xap:metadatadate']){
                        date = data.metadata['_metadata']['xap:metadatadate']
                    }
                    else{
                        date = null
                    }
                }
                catch (err){
                    console.log(err)
                }
            }
            if(!data || data.text.length < 10 || data.numpages<2 || !data.text){
                reject('failed')
            }
            else{
                pdfdata.text = cleanText(data.text)
                pdfdata.sentences = await getSentences(pdfdata.text)
                pdfdata.date = date
            }
            resolve(pdfdata)
        })
        ().catch((err) => { 
            console.log(err)
            reject('failed')
        })
    })
}


async function getSentences(text)
{
    return new Promise (async function(resolve, reject)
    {
        const sentences = await sentencetokenizer.tokenize(text)
        resolve(sentences)
    })
}

async function getWords(text)
{
    return new Promise (async function(resolve, reject)
    {
        const words = await wordtokenizer.tokenize(text)
        resolve(words)
    })
}


function cleanText(text){
    text = text.replace(/\s\s+/g, ' ');
    text = text.replace( /[\r\n\t■]+/gm, " " )
    text = text.toLowerCase()
    return text
}


function render_page(pageData) {
    //check documents https://mozilla.github.io/pdf.js/
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: true,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false
    }
 
    return pageData.getTextContent(render_options)
    .then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
            if (lastY == item.transform[5] || !lastY){
                text += item.str;
            }  
            else{
                text += '\n' + item.str;
            }    
            lastY = item.transform[5];
        }
        return text;
    });
}


async function getDate(file)
{
    return new Promise (function(resolve, reject)
    {
        let options = {
            pagerender: render_page
        }
        let dataBuffer = file.buffer
        let date = null
        ;(async () => {
            let data = await pdf(dataBuffer, options)
            if(data.metadata){
                try{
                    if(data.metadata['_metadata']['xmp:createdate']){
                        date = data.metadata['_metadata']['xmp:createdate']
                    }
                    else if(data.metadata['_metadata']['xmp:metadatadate']){
                        date = data.metadata['_metadata']['xmp:metadatadate']
                    }
                    else if(data.metadata['_metadata']['xap:createdate']){
                        date = data.metadata['_metadata']['xap:createdate']
                    }
                    else if(data.metadata['_metadata']['xap:metadatadate']){
                        date = data.metadata['_metadata']['xap:metadatadate']
                    }
                    else{
                        date = null
                    }
                }
                catch (err){
                    console.log(err)
                }
            }
            resolve(date)
        })
        ().catch((err) => { 
            resolve(null)
        })
    })
}


exports.getText = getText
module.exports.getWords = getWords
module.exports.getDate = getDate