const path = require('path');
const PUBLIC_PATH = "/";
const src = path.join(__dirname, './src');
const dist = path.join(__dirname, './dist');


const config = {
    sourcePath: src,
    distPath: dist,
    publicPath: PUBLIC_PATH
};

module.exports = config;