const { BlobServiceClient } = require("@azure/storage-blob");
var stream = require('stream');
const magick = require('imagemagick-convert');
const config= require('../../../../config/config')
const blobServiceClient = BlobServiceClient.fromConnectionString(config.azureStorageConnectionString);

let uploadFile = async function upload_file(file, filename, container, failname, filetype)
{
    return new Promise(async function(resolve, reject)
    {
        let suffix = determineSuffix(filetype)
        try{
            if(suffix == '.pdf'){
                let firstPageBuffer = await getFirstPage(file)
                uploadImage(filename, firstPageBuffer, suffix)
            }
            else{
                uploadImage(filename, file, suffix)
            }
        }
        catch(err){
            console.log(err)
        }
        if(container == "failed"){
            filename = failname.slice(0,failname.length-4)
        }
        const containerClient = blobServiceClient.getContainerClient(container);
        const blobName = filename + ".pdf";
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        blockBlobClient.upload(file, file.length);
        resolve('done')
    })
}

let uploadImage = async function upload_Image(filename, file, filetype)
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
    }
    var blobStream = new stream.Readable();
    blobStream.push(imgBuffer);
    blobStream.push(null);
    const containerClient = blobServiceClient.getContainerClient('trakrpics');
    const blobName = filename + ".jpg";
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(imgBuffer, imgBuffer.length);
}

let getFirstPage = async function getFirstPage(buffer){
    return new Promise(async function(resolve, reject)
    {
        const hummus = require('hummus');
        const streams = require('memory-streams');
        const PDFRStreamForBuffer = require('./pdfr-stream-for-buffer.js');

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
    })
}


function determineSuffix(datatype){
    try{
        if(datatype.includes('pdf') || datatype.includes('octet')){
            return(".pdf")
          }
          if(datatype.includes('jpg') || datatype.includes('jpeg')){
            return(".jpg")
          }
          if(datatype.includes('png')){
            return(".png")
          }
    }
    catch{
        return(".pdf")
    }
  }

module.exports.uploadFile = uploadFile
module.exports.uploadImage = uploadImage