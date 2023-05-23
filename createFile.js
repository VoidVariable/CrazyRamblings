const fs = require('fs');

const filePath = '/src/Tools';
const fileContent = 'Hello';

fs.writeFileSync(filePath, fileContent);

console.log(`File created: ${filePath}`);
