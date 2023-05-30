const fs = require('fs-extra');
const path = require('path');

const directoryPath = './src/Tools/Vaults';
const filePath = 'src/Tools/MetaInfo';

try {
  const createDirectoryStructureFile = (folderPath) => {
    const folderName = path.basename(folderPath);
    const content = getAllItems(folderPath);
    const fileName = path.join(filePath, `${folderName}.txt`);

    fs.writeFileSync(fileName, content);
    console.log(`Created file: ${fileName}`);
    console.log(`Content of ${fileName}:`);
    console.log(content);
  };

  const getAllItems = (folderPath, indentation = '') => {
    const items = fs.readdirSync(folderPath, { withFileTypes: true });
    let content = '';

    items.forEach((dirent) => {
      if (!dirent.name.startsWith('.') && dirent.name !== 'DONTSHIP') {
        if (dirent.isDirectory()) {
          const subFolderPath = path.join(folderPath, dirent.name);
          const subContent = getAllItems(subFolderPath, `${indentation}\t`);
          content += `${indentation}- ${dirent.name}\n${subContent}`;
        } else if (dirent.isFile()) {
          content += `${indentation}- ${dirent.name}\n`;
        }
      }
    });

    return content;
  };

  const topLevelFolders = fs.readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(directoryPath, dirent.name));

  topLevelFolders.forEach((folderPath) => createDirectoryStructureFile(folderPath));

  console.log(`Directory structures created for top-level folders in ${directoryPath}`);
} catch (error) {
  console.error('Error:', error);
}
