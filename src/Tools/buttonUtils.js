function logSpaces(line){
    const trimmedLine = line.replace('-',' ')
    const spacesBeforeDash = trimmedLine.search(/\S/);
    return spacesBeforeDash - 2;
  };

function getIndexInLines(lines, spacesCount ,text)
{
   return lines.findIndex((line) => {
       const lineSpacesCount = logSpaces(line)
        const btnText = line.replace(/-/g, '');
    return lineSpacesCount === spacesCount && btnText === text;
    });
}

// buttonUtils.js
export function handleButtonClick(state, spacesCount, text) {
    const { closed, hiddenItems, terms } = state;
    const newClosed = [...closed];
    const newHiddenItems = [...hiddenItems];
    const lines = terms.split('\n');

    // Check if the clicked button is already closed
    const isClosed = closed.some((item) => item.spacesCount === spacesCount && item.text === text);

    const currentIndex = getIndexInLines(lines, spacesCount, text);

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
    

    const lines = terms.split('\n');
    const nonEmptyLines = lines.filter((line) => line !== ''); // Filter out empty lines
    const index = getIndexInLines(nonEmptyLines,spacesCount,text)

    const path = [];

    for (let i = index; i >= 0; i--) {
      const line = nonEmptyLines[i]; // Remove leading empty spaces
      // Perform any desired operations with the modified line
      // ...
      if(logSpaces(line.replace(/-/g, '')) >= logSpaces(text) &&
      i !== index) continue;

      path.push(line.replace(/-/g, '').replace(/^\s+/, ''));
      if (logSpaces(line) === 0) break;
      path.push('/');
    }
    
    const reversedPath = path.reverse();
    const pathString = reversedPath.join('');
    
   

    return "/" + pathString;
  }