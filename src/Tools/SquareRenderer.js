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
             
              left: `calc(50% + ${((this.props.point.x/ 2) + node.x) / 13}%)`,
              top: `calc(50% + ${((this.props.point.y/ 5) + node.y) / 13}%`,
              transform: 'translate(-50%, -50%)',

              fontSize: 14,
                         
              width: node.width,
              height: node.height / 1.2,
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
