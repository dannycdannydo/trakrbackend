const { BlobServiceClient } = require("@azure/storage-blob");
const config= require('../../../../config/config')
const blobServiceClient = BlobServiceClient.fromConnectionString(config.azureStorageConnectionString);

const containerName = "trakrpics";

async function getImage(filename) {
    const blobName = filename + '.jpg';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.downloadToBuffer()
    return downloadBlockBlobResponse
}

module.exports.getImage = getImage