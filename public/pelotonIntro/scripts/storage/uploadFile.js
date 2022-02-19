const { BlobServiceClient } = require("@azure/storage-blob");
const config = require('../../config/config')
const connStr = config.azureStorageConnectionString
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);


let uploadFile = async function upload_file(file, filename, container, suffix)
{
    return new Promise(async function(resolve, reject)
    {
        const containerClient = blobServiceClient.getContainerClient(container);
        const blobName = filename + suffix;
        const blobOptions = { blobHTTPHeaders: { blobContentType: 'text/plain' } };
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(file, file.length);
        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
        resolve('done')
    })
}

module.exports.uploadFile = uploadFile