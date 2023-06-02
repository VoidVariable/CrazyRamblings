import React from 'react';
var thisTerms;

export function logSpaces(line){
    const trimmedLine = line.replace('-',' ')
    const spacesBeforeDash = trimmedLine.search(/\S/);
    return spacesBeforeDash - 2;
  };

export function removeLeadingHyphens(str) {
  let firstNonHyphenIndex = str.search(/[^-\s]/);
  
  if (firstNonHyphenIndex !== -1) {
    let leadingHyphens = str.slice(0, firstNonHyphenIndex).replace(/-/g, '');
    return leadingHyphens + str.slice(firstNonHyphenIndex);
  }
  
  return str;
}

export function setGlobalTerms(terms){
  thisTerms = terms;
}

function getIndexInLines(lines, text , spacesCount = -99)
{
  if(spacesCount !== -99){
   return lines.findIndex((line) => {
       const lineSpacesCount = logSpaces(line)
        const btnText = removeLeadingHyphens(line);
    return lineSpacesCount === spacesCount && btnText === text;
    });
  }
  else
  {
    return lines.findIndex((line) => {
       const btnText = removeLeadingHyphens(line).trimStart();
    return btnText === text;
    });
  }
}

// buttonUtils.js
export function handleButtonClick(state, spacesCount, text) {  
    const { closed, hiddenItems, terms } = state;
    thisTerms = terms;
    const newClosed = [...closed];
    const newHiddenItems = [...hiddenItems];
    const lines = terms.split('\n');

    // Check if the clicked button is already closed
    const isClosed = closed.some((item) => item.spacesCount === spacesCount && item.text === text);

    const currentIndex = getIndexInLines(lines,text,spacesCount);

    if (isClosed) {
      // Remove the clicked button's entry from the closed list
      const index = newClosed.findIndex((item) => item.spacesCount === spacesCount && item.text === text);
      
      if (index > -1) {
        newClosed.splice(index, 1);
      }


    for (let i = currentIndex + 1; i < lines.length; i++) {
        
        const lineSpacesCount = logSpaces(lines[i]);
        if(currentIndex >= i) continue;

        if (lineSpacesCount <= spacesCount) {
            break;
        }
        
        //Find the item that has the same txt ans spaceCount
        const testIndex = newHiddenItems.findIndex((item) =>
             item.lineSpacesCount === lineSpacesCount && item.newText === lines[i]);

        if(testIndex <= -1) continue;

        newHiddenItems.splice(testIndex,1);
        //newHiddenItems.push({lineSpacesCount, newText});
    }
      

    } else {
      // Add the clicked button's entry to the closed list
      newClosed.push({ spacesCount, text });
  
      // Hide all buttons with higher spacesCount until the next item at the same level
      if (currentIndex !== -1) {
        for (let i = currentIndex + 1; i < lines.length; i++) {
          const lineSpacesCount = logSpaces(lines[i]);
          
          if (lineSpacesCount <= spacesCount) {
            break;
          }

          const newText = lines[i];
          newHiddenItems.push({lineSpacesCount, newText});
        }
      }
    }
  
    return { closed: newClosed, hiddenItems: newHiddenItems };
  }
  
export function handleFileClick(state, spacesCount, text) 
{
    const {terms} = state;
    thisTerms = terms;
    return getFilePath(spacesCount, text);
}

export function  getFilePath(spacesCount, text)
{
  const lines = thisTerms.split('\n');
  const nonEmptyLines = lines.filter((line) => line !== ''); // Filter out empty lines
  const index = getIndexInLines(nonEmptyLines,text,spacesCount)

  if(index < 0)
    return "No path";

  const path = [];

  var currentlog = logSpaces(text);

  for (let i = index; i >= 0; i--) {
    const line = nonEmptyLines[i]; // Remove leading empty spaces
    // Perform any desired operations with the modified line
    // ...
    if(logSpaces(removeLeadingHyphens(line)) >= currentlog &&
    i !== index) continue;

    currentlog = logSpaces(removeLeadingHyphens(line));


    path.push(removeLeadingHyphens(line).replace(/^\s+/, ''));
    if (logSpaces(line) === 0) break;
    path.push('/');
  }
  
  const reversedPath = path.reverse();
  const pathString = reversedPath.join('');
      
  return "/" + pathString;

}

export function getFilePathByName (name)
{
  const lines = thisTerms.split('\n');
  const nonEmptyLines = lines.filter((line) => line !== ''); // Filter out empty lines
  
  const index = getIndexInLines(nonEmptyLines,name); 

  if(index < 0)
    return "No path";

  const text = nonEmptyLines[index];

  const path = [];

  var currentlog = logSpaces(text);

  for (let i = index; i >= 0; i--) {
    const line = nonEmptyLines[i]; // Remove leading empty spaces
    // Perform any desired operations with the modified line
    // ...
    if(logSpaces(removeLeadingHyphens(line)) >= currentlog &&
    i !== index) continue;

    currentlog = logSpaces(removeLeadingHyphens(line));


    path.push(removeLeadingHyphens(line).replace(/^\s+/, ''));
    if (logSpaces(line) === 0) break;
    path.push('/');
  }
  
  const reversedPath = path.reverse();
  const pathString = reversedPath.join('');
      
  return "/" + pathString;
}

export function removeFormat(text) {
  const lastDotIndex = text.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return text.substring(0, lastDotIndex);
  }
  return text;
}


export function getIconfromFormat(text) {
   const formatRegex = /\.([a-zA-Z0-9]+)$/; // Regular expression to match file format

  const matches = text.match(formatRegex);
  if (matches && matches.length > 1) {
    const format = matches[1];

    if(text.trim() === "Home.md") return <i class="fa-solid fa-house" style={{ float: 'right' }}></i>

    switch (format.toLowerCase()) {
      case 'png':
        return <i className="fa-solid fa-image" style={{ float: 'right' }}></i>;
      case 'md':
        return <i class="fa-solid fa-t" style={{ float: 'right' }}></i>;
      case 'canvas':
        return <i class="fa-sharp fa-solid fa-network-wired" style={{ float: 'right' }}></i>;
      default:
        return <i className="fa-solid fa-file" style={{ float: 'right' }}></i>;
    }
  }

  return null; // Return null if format not found
}

export default {
  removeFormat,
  handleButtonClick,
  handleFileClick,
  removeLeadingHyphens,
  getFilePath,
  logSpaces,
  setGlobalTerms,
  getIconfromFormat,
  getFilePathByName
};
