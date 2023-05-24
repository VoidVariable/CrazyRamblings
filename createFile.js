const fs = require('fs-extra');

const directoryPath = './src/Tools/Obsidian';
const filePath = 'src/Tools/file.md';

try {
  const items = fs.readdirSync(directoryPath, { withFileTypes: true });
  const folders = items
    .filter(dirent => dirent.isDirectory())
    .map(dirent => `- ${dirent.name}`);

  const files = items
    .filter(dirent => dirent.isFile())
    .map(dirent => `- ${dirent.name}`);

  const folderList = folders.join('\n');
  const fileList = files.join('\n');

  const content = `${folderList}\n${fileList}`;

  fs.writeFileSync(filePath, content);

  console.log(`List of folders and files saved to ${filePath}`);
} catch (error) {
  console.error('Error reading directory:', error);
}
