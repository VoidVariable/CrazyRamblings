import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './MarkdownDisplay.css';
import fetchingData from './dataFetcher';

class MarkdownDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { terms: null };
  }

  componentDidMount() {
    this.fetchMarkdownData();
  }

  renderTextWithLinks = (text) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    return text[0].split(linkRegex).map((part, index) => {
      if (part.match(linkRegex)) {
        return (
          <a href={part} className = 'links' key={index}>
            {part}
          </a>
        );
      }
      return part;
    });
  };
  
  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.fetchMarkdownData();
    }
  }

  fetchMarkdownData = async () => {
    try {
      const markdownData = await fetchingData('text', this.props.path);

      this.setState({ terms: markdownData });
      // Do something with the markdownData, such as displaying it in the component state or rendering it.
    } catch (error) {
      // Handle any errors that occur during the fetch.
      console.error('Error fetching Markdown data:', error);
    }
  };
  
  render() {
    
    const customComponents = {
      h1: ({ children }) => <h1 style={{ color: 'red' }}>{children}</h1>,
      h2: ({ children }) => <h2 style={{ color: 'blue' }}>{children}</h2>,
      code: ({ node, inline, className, children, ...props }) => {
        if (className === 'language-') {
          console.log("");
          // Render inline code
          return <code style={{ color: '#abb2bf', backgroundColor: '#1f2329', padding: '2px 4px', borderRadius: '4px' }} {...props}>{children}</code>;
        } else {
          // Render code blocks
          const language = className ? className.replace('language-', '') : '';
          return (
            <pre style={{ backgroundColor: '#161a1f', padding: '10px', borderRadius: '4px' }}>
              <code className={`language-${language}`} style={{ color: '#abb2bf' }} {...props}>
                {children}
              </code>
            </pre>
          );
        }
      },
      blockquote: ({ children }) => (
        <blockquote
          style={{
            borderLeft: '2px solid #ccc',
            paddingLeft: '10px',
            fontStyle: 'italic',
            color: '#555',
            marginLeft: '0',
            marginRight: '0',
            marginBottom: '0',
            marginTop: '1em', // Use '1em' instead of '1px' to create space between blockquotes
            borderTop: 'none', // Add this line to remove the top border of the current blockquote
          }}
        >
          {children}
        </blockquote>
      ),
      p: ({ children }) => {      
        return this.renderTextWithLinks(children); // Custom rendering for plain text with links   
      }    
  };
  
    return (
      <div className="content" style={{ overflow: 'auto', height: '88.1vh', boxSizing: 'border-box' }}>       
        <ReactMarkdown components={customComponents}>{this.state.terms}</ReactMarkdown>
      </div>
      );
      
  }
}

export default MarkdownDisplay;
