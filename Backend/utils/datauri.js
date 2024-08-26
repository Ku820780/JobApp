
const DatauriParser = require('datauri/parser');
const path = require('path');

const getDataUri = (file) => {
    const parser = new DatauriParser();
    const extName = path.extname(file.originalname);
    const dataUri = parser.format(extName, file.buffer);
    return dataUri.content; // This returns the Data URI string
};

module.exports = getDataUri;

