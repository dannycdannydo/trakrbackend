const hummus = require('hummus');
const streams = require('memory-streams');
const PDFRStreamForBuffer = require('./pdfr-stream-for-buffer.js');
const magick = require('imagemagick-convert');
const { first } = require('lodash');

let pdfToJpg = async function pdfToJpg(pdfBuffer, filename)
{
    return new Promise(async function(resolve, reject)
    {
        try {
            let firstPageBuffer = await getFirstPage(pdfBuffer)
            let imageBuffer = await jpgConversion(filename, firstPageBuffer, 'pdf')
            resolve(imageBuffer)
        }
        catch {
            resolve('')
        }
    })
}

let getFirstPage = async function getFirstPage(buffer)
{
    return new Promise(async function(resolve, reject)
    {
        try{
            //Creating a stream, so hummus pushes the result to it
        let outStream = new streams.WritableStream();
        //Using PDFStreamForResponse to be able to pass a writable stream
        let pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(outStream));

        //Using our custom PDFRStreamForBuffer adapter so we are able to read from buffer
        let copyingContext = pdfWriter.createPDFCopyingContext(new PDFRStreamForBuffer(buffer));
        //Get the first page.
        copyingContext.appendPDFPageFromPDF(0);

        //We need to call this as per docs/lib examples
        pdfWriter.end();

        //Here is a nuance.
        //HummusJS does it's work SYNCHRONOUSLY. This means that by this line
        //everything is written to our stream. So we can safely run .end() on our stream.
        outStream.end();

        //As we used 'memory-stream' and our stream is ended
        //we can just grab stream's content and return it
        resolve(outStream.toBuffer()) 
        } catch (e) {
            console.log(e)
            resolve()
        }
    })
}

let jpgConversion = async function upload_Image(filename, file, filetype)
{
    let fileFormat = filetype.replace('.', '').toUpperCase()
    let imgBuffer = null
    try{
        imgBuffer = await magick.convert({
            srcData: file,
            srcFormat: fileFormat,
            format: 'JPEG',
            density: 300,
        });
    }
    catch(err){
        console.log(err)
        return
    }
    return(imgBuffer)
}

module.exports.pdfToJpg = pdfToJpg
module.exports.jpgConversion = jpgConversion