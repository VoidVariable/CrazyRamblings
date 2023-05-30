const fs = require('fs-extra');

const directoryPath = './src/Tools/Vaults';
const filePath = 'src/Tools/MetaInfo';

try {
  const getAllItems = (path, indentation = '') => {
    const items = fs.readdirSync(path, { withFileTypes: true });
    let content = '';

    items.forEach((dirent) => {
      if (!dirent.name.startsWith('.') && dirent.name !== 'DONTSHIP') { // Ignore hidden files and folders with the name 'DONTSHIP'
        if (dirent.isDirectory()) {
          const folderPath = `${path}/${dirent.name}`;
          const subContent = getAllItems(folderPath, `${indentation}\t`);
          content += `${indentation}- ${dirent.name}\n${subContent}`;
        } else if (dirent.isFile()) {
          content += `${indentation}- ${dirent.name}\n`;
        }
      }
    });

    return content;
  };

  const content = getAllItems(directoryPath);

  fs.writeFileSync(filePath, content);

  console.log(`List of folders and files saved to ${filePath}`);
} catch (error) {
  console.error('Error reading directory:', error);
}
