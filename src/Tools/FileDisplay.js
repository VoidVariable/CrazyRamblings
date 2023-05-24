import React, { Component } from 'react';
import termsFrPath from './file.md';
import './FileDisplay.css';
import { handleButtonClick } from './buttonUtils';

class MarkdownDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      terms: null,
      hiddenItems: [],
      closed: [] };
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
  }

  logSpaces = (line) => {
    const trimmedLine = line.replace('-',' ')
    const spacesBeforeDash = trimmedLine.search(/\S/);
    return spacesBeforeDash - 2;
  };
  
  handleButtonClick(spacesCount, text) {
  
    const newState = handleButtonClick(this.state, spacesCount, text);

    this.setState(newState);
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
      const spacesCount = this.logSpaces(line);
      const trimmedLine = line.replace(/-/g, '');

      const buttonClassName = trimmedLine.includes('.') ? 'fileButton' : 'fileButton darker';

      const spacePadding = '\u00A0'.repeat(spacesCount);
      
      const shouldDisplayButton = !hiddenItems.some((item) => 
        item.lineSpacesCount === spacesCount && item.newText === line);


      return (
        <div key={index} className="button-line">
              {shouldDisplayButton && (
                <button
                  className={buttonClassName}
                  onClick={() => this.handleButtonClick(spacesCount, trimmedLine)}
                >
                  {spacePadding}
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
