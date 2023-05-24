import React, { Component } from 'react';
import termsFrPath from './file.md';
import './FileDisplay.css';

class MarkdownDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { terms: null };
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
    const spacesBeforeDash = line.search(/\S/);
    return spacesBeforeDash;
  };
  
  render() {

   const { terms } = this.state;

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

      const buttonClassName = spacesCount === 0 ? 'fileButton darker' : 'fileButton';
      const spacePadding = '\u00A0'.repeat(spacesCount);

      return (
        <div key={index} className="button-line">
          <button
            className={buttonClassName}
            onClick={() => this.logSpaces(line)}
          >  
            {spacePadding}
            {trimmedLine}
          </button>
        </div>
      );
    })}
  </div>
);
  }
}

export default MarkdownDisplay;
