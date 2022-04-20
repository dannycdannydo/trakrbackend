const { BlobServiceClient } = require("@azure/storage-blob");
const config = require('../../../../config/config')
const sharp = require('sharp');
const blobServiceClient = BlobServiceClient.fromConnectionString(config.azureStorageConnectionString);

const containerName = "peloton";

async function getImage(filename) {
    const blobName = filename + '.jpg';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    let downloadBlockBlobResponse = await blobClient.downloadToBuffer()
    downloadBlockBlobResponse = await sharp(downloadBlockBlobResponse).resize(200,250).toBuffer()
    return downloadBlockBlobResponse
}

module.exports.getImage = getImage