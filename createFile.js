const fs = require('fs-extra');

const filePath = 'sc/Tools/file.md';
const headerContent = '# Hello';

try {
    fs.outputFileSync(filePath, headerContent);
    console.log(`File created: ${filePath}`);
} catch (error) {
    console.error('Error creating file:', error);
}