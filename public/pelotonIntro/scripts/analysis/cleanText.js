async function cleanText(text) {
    return text.replace(/[ \t]*<h[1-6]{1}.*>(.*)<\/h[1-6]{1}>[\n\r]/ig,"");
}

module.exports.cleanText = cleanText