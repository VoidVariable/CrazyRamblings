const fs = require('fs-extra');

const filePath = 'src/Tools/file.md';
const path = '/Tools';

try {
    const folders = fs.readdirSync(path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
        
    const folderList = folders.join('\n');
    fs.writeFileSync(filePath, folderList);
    
    console.log(`List of folders saved to ${outputFile}`);
} catch (error) {
    console.error('Error reading directory:', error);
}
