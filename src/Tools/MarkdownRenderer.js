import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ terms }) => {
  
    const renderTextWithLinks = (text) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    return text[0].split(linkRegex).map((part, index) => {
      if (part.match(linkRegex)) {
        return (
          <a href={part} className="links" key={index}>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const customComponents = {
    h1: ({ children }) => <h1 style={{ color: 'red' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ color: 'blue' }}>{children}</h2>,
    code: ({ node, inline, className, children, ...props }) => {
      if (className === 'language-') {
        // Render inline code
        return (
          <code
            style={{
              color: '#abb2bf',
              backgroundColor: '#1f2329',
              padding: '2px 4px',
              borderRadius: '4px',
            }}
            {...props}
          >
            {children}
          </code>
        );
      } else {
        // Render code blocks
        const language = className ? className.replace('language-', '') : '';
        return (
          <pre style={{overflowX: 'auto', backgroundColor: '#161a1f', padding: '10px', borderRadius: '4px',whiteSpace: 'pre-wrap' }}>
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
      return renderTextWithLinks(children); // Custom rendering for plain text with links
    },
  };

  return <ReactMarkdown components={customComponents}>{terms}</ReactMarkdown>;
};

export default MarkdownRenderer;
