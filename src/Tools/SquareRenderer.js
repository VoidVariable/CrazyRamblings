import React from 'react';

class SquareRenderer extends React.Component {  
  render() {
    const { nodes } = JSON.parse(this.props.canvasData);;
    
    console.log(this.props.canvasData);
    console.log(nodes);

    return (
      <div>
        Tests
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{
              padding: 10,              
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#989',
              position: 'absolute',
              borderStyle: 'solid', // Add this line to set the border style
             
              left: `calc(50% + ${((this.props.point.x/ 2) + node.x) * 1.1}px)`,
              top: `calc(50% + ${((this.props.point.y /8) + node.y) * 1.45}px)`,
              transform: 'translate(-50%, -50%)',

              fontSize: 14,                        
              width: `${node.width}px`, // Use percentage for width
              height: `${node.height}px`, // Use percentage for height          
              backgroundColor: '#191721',
              color: '#aaa',
              zIndex: 0, // Set a lower z-index value for the div elements
              
            }}
          >
            <h3>{node.text}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default SquareRenderer;
