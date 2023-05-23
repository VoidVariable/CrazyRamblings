import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import termsFrPath from './Obsidian/Resources/Gaster Master/Spamton Dialogue.md';

class MarkdownDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { terms: null };
  }

  componentDidMount() {
    fetch(termsFrPath)
      .then((response) => response.text())
      .then((text) => {
        this.setState({ terms: text });
      });
  }

  render() {
    const customComponents = {
      h1: ({ children }) => <h1 style={{ color: 'red' }}>{children}</h1>,
      h2: ({ children }) => <h2 style={{ color: 'blue' }}>{children}</h2>,
      a: ({ children, href }) => (
        <a href={href} style={{ color: 'blue' }}>
          {children}
        </a>),
      // Define custom components for other Markdown elements if needed
      // For example: p, a, ul, etc.
    };

    return (
        <div className="content" style={{ overflow: 'auto', height: '800px', boxSizing: 'border-box' }}>
          <ReactMarkdown components={customComponents}>{this.state.terms}</ReactMarkdown>
        </div>
      );
      
  }
}

export default MarkdownDisplay;
