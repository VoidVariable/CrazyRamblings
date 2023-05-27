import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getFilePathByName } from './buttonUtils';
import MiddleContent from './MiddleContent';

const MarkdownRenderer = React.memo(({ terms }) => {
  
  const renderText = (text) => {
    const linkRegex = /(https?:\/\/[^\cs]+)/g;
    const customRegex = /!\[\[.+?\.\w+\]\]/g;
    const obsLinkRegex = /\[\[.+?\]\]/g;
    
    var splitValues = text[0];

    if(splitValues.includes("https")){
      //splitValues = splitValues.split(linkRegex);
    }
    else if(splitValues.includes("![[")){
      splitValues = splitValues.split();
    }
    else if (splitValues.includes("[[")){
      splitValues = splitValues.split(/(?=\[\[)/);
    }
    else{
      splitValues = splitValues.split();
    }
    
    return splitValues
      .map((part, index) => {
        if (part.match(customRegex)) {
         
          const substring = part.replace(/^!\[\[(.+?)\]\]$/, '$1');
          // Remove the ![[]] from the string
          // Use that string to get a path by calling the getFilePath(logSpaces(substring), substring) function
          const filePath = getFilePathByName(substring);
  
          return (
            <MiddleContent path={'/Obsidian' + filePath} />
          );
        } 
        else if (part.match(linkRegex)) {
          // Render links
          return (
            <a href={part} className="links" key={index}>
              {part}
            </a>
          );
        }
        else if (part.match(obsLinkRegex)) {          
          // Render links
         
          return ( 
            <span
            style={{ color: 'purple', cursor: 'pointer' }}
            key={index}
            onClick={() => alert('links between files not working yet :C')}
          >
            {part}
          </span>
          
          );
        }
        return part;
      });
  };
  

  const customComponents = {
    h1: ({ children }) => <h1 style={{ color: 'red',marginTop: '-5px' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ color: 'blue', marginTop: '-5px'}}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ marginTop: '-5px' }}>{children}</h3>,
    h4: ({ children }) => <h4 style={{ marginTop: '-5px' }}>{children}</h4>,
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
          <pre style={
            {
              overflowX: 'auto',
              backgroundColor: '#161a1f',
              borderRadius: '4px',
              whiteSpace: 'pre-wrap'  
            }}>
            <code className={`language-${language}`} style={{ color: '#abb2bf' }} {...props}>
              {children}
            </code>
          </pre>
        );
      }
    },
    blockquote: ({ children }) => {
      return <blockquote
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
      </blockquote>;
    },
    em: ({ children }) => {
      return <em style={{ fontStyle: 'italic' }}>{children}</em>;
    }, 
    strong: ({ children }) => {
      return <strong style={{ fontWeight: 'bold' }}>{children}</strong>;
    },
    p: ({ children }) => {
      console.log(children);
      return renderText(children); // Custom rendering for plain text with links
    }, 

    
  };

  return <ReactMarkdown components={customComponents}>{terms}</ReactMarkdown>;
});

export default MarkdownRenderer;