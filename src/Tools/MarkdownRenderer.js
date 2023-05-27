import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getFilePathByName } from './buttonUtils';
import MiddleContent from './MiddleContent';

const MarkdownRenderer = React.memo(({ terms }) => {
  
  const renderText = (text) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const customRegex = /!\[\[.+?\.\w+\]\]/g;
    const obsLinkRegex = /\[\[.+?\]\]/g;
    const youtubeRegex = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/g;

    const boldoneRegex = /\*\*.+?\*\*/g;
    const boldtwoRegex = /__.+?__/g;

    var splitValues = "";

    for (var i = 0; i < text.length; i++) {
      if (text[i]?.type === "strong" || text[i]?.type?.name === 'em') {
        if (text[i]?.props?.children[0]) {
          splitValues += "**" + text[i]?.props?.children[0] + "**";
          continue;
        }
      }
      splitValues += text[i];
    }

    if (splitValues.includes("https")) {
      splitValues = splitValues.split(linkRegex);
    } else if (splitValues.includes("![[")) {
      splitValues = splitValues.split(/(?=\[\[)/);
    } else if (splitValues.includes("[[")) {
      splitValues = splitValues.split(/(?=\[\[)/);
    } else if (splitValues.includes("**")) {
      splitValues = splitValues.split(/(?<=\*\*.+?\*\*)|(?=\*\*.+?\*\*)/);
    } else if (splitValues.includes("__")) {
      splitValues = splitValues.split(/(?=__)/);
    } else {
      splitValues = splitValues.split();
    }

    return splitValues.map((part, index) => {
      if (part.match(customRegex)) {
        const substring = part.replace(/^!\[\[(.+?)\]\]$/, '$1');
        const filePath = getFilePathByName(substring);
        return <MiddleContent path={'/Obsidian' + filePath} />;
      } else if (part.match(linkRegex)) {
        if (part.match(youtubeRegex)) {
          const videoId = part.match(youtubeRegex)[0].split('=')[1];
          return (
            <iframe
              width="100%"
              height="250"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          );
        } else {
          return (
            <a href={part} className="links" key={index}>
              {part}
            </a>
          );
        }
      } else if (part.match(obsLinkRegex)) {
        return (
          <span
            style={{ color: 'purple', cursor: 'pointer' }}
            key={index}
            onClick={() => alert('links between files not working yet :C')}
          >
            {part}
          </span>
        );
      } else if (part.match(boldoneRegex) || part.match(boldtwoRegex)) {
        return <strong>{part.substring(2, part.length - 2)}</strong>;
      }
      return part;
    });
  };
  

  const customComponents = {
    h1: ({ children }) => <h1 style={{ marginTop: '-5px' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ marginTop: '-5px'}}>{children}</h2>,
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
    p: ({ children }) => {
      return renderText(children); // Custom rendering for plain text with links
    }, 

    
  };

  return <ReactMarkdown components={customComponents}>{terms}</ReactMarkdown>;
});

export default MarkdownRenderer;