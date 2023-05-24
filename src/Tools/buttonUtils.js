function logSpaces(line){
    const trimmedLine = line.replace('-',' ')
    const spacesBeforeDash = trimmedLine.search(/\S/);
    return spacesBeforeDash - 2;
  };

// buttonUtils.js
export function handleButtonClick(state, spacesCount, text) {
    const { closed, hiddenItems, terms } = state;
    const newClosed = [...closed];
    const newHiddenItems = [...hiddenItems];
    const lines = terms.split('\n');

    // Check if the clicked button is already closed
    const isClosed = closed.some((item) => item.spacesCount === spacesCount && item.text === text);

    let currentIndex = lines.findIndex((line) => {
        const lineSpacesCount = logSpaces(line)
        const btnText = line.replace(/-/g, '');
      
        return lineSpacesCount === spacesCount && btnText === text;
    });

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
  