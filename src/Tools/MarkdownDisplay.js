import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import termsFrPath from './file.md';

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

  
  render() {
    const customComponents = {
      h1: ({ children }) => <h1 style={{ color: 'red' }}>{children}</h1>,
      h2: ({ children }) => <h2 style={{ color: 'blue' }}>{children}</h2>,
      code: ({ node, inline, className, children, ...props }) => {
        if (className === 'language-') {
          // Render inline code
          return <code style={{ color: ' #abb2bf', backgroundColor: '#1f2329', padding: '2px 4px', borderRadius: '4px' }} {...props}>{children}</code>;
        } else {
          // Render code blocks
          const language = className ? className.replace('language-', '') : '';
          return (
            <pre style={{ backgroundColor: '#161a1f', padding: '10px', borderRadius: '4px' }}>
              <code className={`language-${language}`} style={{ color: ' #abb2bf' }} {...props}>
                {children}
              </code>
            </pre>
          );
        }
      },
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
