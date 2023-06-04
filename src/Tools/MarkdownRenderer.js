import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { getFilePathByName } from './buttonUtils';
import MiddleContent from './MiddleContent';
import EmbeddedIframe from './EmbeddedIframe';
import remarkGfm  from 'remark-gfm';

const MarkdownRenderer = React.memo(({ terms }) => {
  

  const rehypePlugins = [rehypeRaw];

  const renderText = (text) => {
    
    //#region Regex
    const linkRegex = /(https?:\/\/[^\cs]+)/g;
    const customRegex = /!\[\[.+?\.\w+\]\]/g;
    const obsLinkRegex = /\[\[.+?\]\]/g;
    
    const boldoneRegex = /\*\*.+?\*\*/g;
    const boldtwoRegex = /__.+?__/g;
    const iframeRegex = /<iframe.+?<\/iframe>/g;
    const weblinkRegex = /<a>.+?<\/a>/g;

    //#endregion

    var splitValues = "";

    //#region Convert obj into text
    for (var i = 0; i < text.length; i++) 
    {

      if(text[i]?.type === "strong" || text[i]?.type?.name === 'em')
      {
        if( text[i]?.props?.children[0])
        {
            splitValues += "**" + text[i]?.props?.children[0] + "**";

            continue;
        }
      }
      else if(text[i]?.type === 'a')
      {
        splitValues += "<a>[" + text[i]?.props.children[0] + "]("+
        text[i]?.props.href +")</a> ";
        continue;
      }

        splitValues += text[i];
    }  
    //#endregion

    //#region Splits
    if (splitValues.includes("<a>")){
      splitValues = splitValues.split(/(<a>.*?<\/a>)/);
    }
    else if(splitValues.includes("https")){
      splitValues = splitValues.split(linkRegex);
    }
    else if(splitValues.includes("![[")){
      splitValues = splitValues.split();
    }
    else if (splitValues.includes("[[")){
      splitValues = splitValues.split(/(?=\[\[)/);
    }
    else if (splitValues.includes("**"))
    {
      splitValues = splitValues.split(/(?<=\*\*.+?\*\*)|(?=\*\*.+?\*\*)/);
    }
    else if (splitValues.includes("__")){
      splitValues = splitValues.split(/(?=__)/);
    }
    else if (splitValues.includes("<iframe"))
    {   
      splitValues = splitValues.split(iframeRegex);
    }
    else{    
      splitValues = splitValues.split();
    }
    

    //#endregion

    return splitValues
      .map((part, index) => {
        if (part.match(customRegex)) {
         
          const substring = part.replace(/^!\[\[(.+?)\]\]$/, '$1');
          // Remove the ![[]] from the string
          // Use that string to get a path by calling the getFilePath(logSpaces(substring), substring) function
          const filePath = getFilePathByName(substring);
  
          return (
            <MiddleContent path={filePath} key={index}/>
          );
        } 
        else if (weblinkRegex.test(part)) {
          const linkText = part.match(/\[(.*?)\]/)[1];
          const linkURL = part.match(/\((.*?)\)/)[1];
          return (
            <a href={linkURL} className="links" key={index}>
              {linkText}
            </a>
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
        else if (part.match(boldoneRegex) || part.match(boldtwoRegex)) {          
          // Render links         
          return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
        }
        else if (part.match(iframeRegex))
        {
         <EmbeddedIframe key={index} iframeCode={part}></EmbeddedIframe>
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
              padding: '1em',
              fontSize: '0.8em',
              overflowX: 'auto',
              backgroundColor: '#0007',
              borderRadius: '10px',
              whiteSpace: 'pre-wrap',
              boxSizing: 'border-box',
              marginLeft: '1em'
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
    iframe: ({ src }) => {
      console.log(src)
      try {
        return (
          <div>
            <iframe
              
              width="100%"
              height="250"
              src={src}
              title="Embedded Content"
              frameBorder="0"        
              allowFullScreen
            ></iframe>
          </div>
        );
      } catch (error) {
        // Handle or ignore the error
        return null; // or display an error message
      }
    },   
    ul: ({ children }) => (
      <ul style={{ marginLeft: '0',paddingLeft: '1.5em' }}>{children}</ul>
    ),    
    table: ({ children }) => (
      <div style={{ 
        flexDirection: 'column',
        display:'flex',

         }}>
        <table
          style={{
            marginBottom: '1em',
            borderCollapse: 'collapse',  
            alignSelf: 'center'
          }}
        >
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th
        style={{
          border: '1px solid #000',
          padding: '8px',
          textAlign: 'center',
          backgroundColor: '#0008',
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        style={{
          border: '1px solid #000',
          padding: '8px',
          textAlign: 'center',
          backgroundColor: '#0003'
        }}
      >
        {children}
      </td>
    ),
  };
  return <ReactMarkdown components={customComponents} remarkPlugins={remarkGfm} rehypePlugins={rehypePlugins}>{terms}</ReactMarkdown>;
});

export default MarkdownRenderer;