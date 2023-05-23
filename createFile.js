const fs = require('fs-extra');

const filePath = 'path/to/file.txt';
const fileContent = 'Hello';

fs.outputFileSync(filePath, fileContent);

console.log(`File created: ${filePath}`);
