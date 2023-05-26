import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

class SquareRenderer extends React.Component {  
  render() {
    const { nodes } = JSON.parse(this.props.canvasData);;

    return (
      <div>
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{
              padding: 15,              
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#989',
              position: 'absolute',
              borderStyle: 'solid', // Add this line to set the border style
             
              left: `calc(50% + ${((this.props.point.x / 3) + node.x)}px)`,
              top: `calc(50% + ${((this.props.point.y / 3) + node.y)}px)`,
              transform: 'translate(-50%, -50%)',

              fontSize: 20,                        
              width: `${node.width * 1.1}px`, // Use percentage for width
              height: `${node.height * 1.1}px`, // Use percentage for height          
              backgroundColor: '#191721',
              color: '#aaa',
              zIndex: 0, // Set a lower z-index value for the div elements

            }}
          >
            <MarkdownRenderer terms={node.text} />
          </div>
        ))}
      </div>
    );
  }
}

export default SquareRenderer;
