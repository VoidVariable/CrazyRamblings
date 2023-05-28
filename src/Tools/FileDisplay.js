import React, { Component } from 'react';
import termsFrPath from './file.md';
import './FileDisplay.css';
import { handleButtonClick, handleFileClick, removeLeadingHyphens, logSpaces,setGlobalTerms, getFilePath } from './buttonUtils';

class MarkdownDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      terms: null,
      hiddenItems: [],
      closed: [],
      selected: null  };
  }

  componentDidMount() {
    // Read the file created during the build
    fetch(termsFrPath)
      .then((response) => response.text())
      .then((text) => {
        this.setState({ terms: text });
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });

      setGlobalTerms(this.state.terms);
  }

  handleClick(type,spacesCount, text) {  
    if (type === 'fileButton darker') {
      const newState = handleButtonClick(this.state, spacesCount, text);
      this.setState(newState);
    } else {
      const newState = { selected: { spacesCount: spacesCount, text: text } };
      this.setState(newState);
  
      const path = handleFileClick(this.state, spacesCount, text);

      const newPath = '/Obsidian' + path;
      this.props.handlePathChange(newPath);
    }
  }

  render() {

   const { terms, hiddenItems } = this.state;

if (!terms) {
  return <div>Loading...</div>;
}

const lines = terms.split('\n');

const nonEmptyLines = lines.filter((line) => line !== ''); // Filter out empty lines

return (
<div className="button-contents">
  {nonEmptyLines.map((line, index) => {
    setGlobalTerms(this.state.terms);
    const spacesCount = logSpaces(line);
    const trimmedLine = removeLeadingHyphens(line);

    var buttonClassName = trimmedLine.includes('.') ? 'fileButton' : 'fileButton darker';

    if(this.state.selected?.spacesCount === spacesCount && this.state.selected?.text === trimmedLine)
    { 
    
      buttonClassName = 'fileButton selected';
    }

    var spacePadding = '\u00A0'.repeat((Math.max(spacesCount - 1, 0) * 4));
    var arrow = '';

    const hideFile = !getFilePath(logSpaces(line),trimmedLine).includes("[Hide]");

    if(spacesCount !== 0){
      spacePadding += "\u00A0\u00A0\u00A0\u00A0"
    }

    if (buttonClassName === 'fileButton darker') {
      arrow = this.state.closed.some((item) => item.spacesCount === spacesCount && item.text === trimmedLine) ? '▶' : '▼';
      spacePadding = "\u00A0".concat(spacePadding);
    }
    else
    {
      if(spacesCount !== 0)
      {
        spacePadding = spacePadding.substring(0, spacePadding.length-4);
        spacePadding = (spacePadding) + ("|\u00A0\u00A0\u00A0");
      }
    }

    const shouldDisplayButton = !hiddenItems.some(
      (item) => item.lineSpacesCount === spacesCount && item.newText === line
    );

    return (
      <div key={index} className="button-line">
        {shouldDisplayButton && hideFile && (
          <button
            className={buttonClassName}
            onClick={() => {
              this.handleClick(buttonClassName, spacesCount, trimmedLine);
            }}
          >
            {spacePadding}
            {arrow && <span className="arrow">{arrow}</span>}
            {trimmedLine}
          </button>
        )}
      </div>
    );
  })}
</div>
);
  }
}

export default MarkdownDisplay;
