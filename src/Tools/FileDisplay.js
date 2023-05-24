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
    const spacesCount = line.search(/\S/); // Get the index of the first non-space character
    console.log(`${spacesCount} - ${line}`);
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
      {nonEmptyLines.map((line, index) => (
        <div key={index} className="button-line">
          <button className = "fileButton" onClick={() => this.logSpaces(line)}>
            {line.replace(/-/g, '')}
          </button>
        </div>
      ))}
    </div>
    );
  }
}

export default MarkdownDisplay;
