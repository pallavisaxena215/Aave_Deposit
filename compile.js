const path = require('path');// will hep in building a path from compile.js file to inbox.sol file
const fs = require ('fs');// to read the contents of the file we use file system (fs) module
const solc = require('solc');

const AavePath = path.resolve(__dirname,'contracts', 'Aave.sol'); //declaration of path 


const source= fs.readFileSync(AavePath,'utf8');

module.exports=solc.compile(source,1).contracts[':Aave'];
 // the exports statement will make the byte code of the contract to all the other files
