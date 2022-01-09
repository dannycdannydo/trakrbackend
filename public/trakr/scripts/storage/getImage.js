const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
const config= require('../../../../config/config')
const fs = require('fs')

const account = "trakr";
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = BlobServiceClient.fromConnectionString(config.azureStorageConnectionString);

const containerName = "trakrpics";

async function getImage(filename) {
    const blobName = filename + '.jpg';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    const downloadBlockBlobResponse = await blobClient.downloadToBuffer()
    return downloadBlockBlobResponse
}

module.exports.getImage = getImage