import React from 'react';

class SquareRenderer extends React.Component {
  constructor(props) {
    super(props);
    }
  
  render() {
    const { nodes } = this.props.config;
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
             
              left: `calc(50% + ${(this.props.point.x/20) + node.x}%)`,
              top: `calc(50% + ${(this.props.point.y/70) + node.y}%`,
              transform: 'translate(-50%, -50%)',
        
              width: node.width *2,
              height: node.height * 2,
              backgroundColor: '#191721',
              color: '#aaa',
              zIndex: 0, // Set a lower z-index value for the div elements
              
            }}
          >
            <h3>{node.id}</h3>
            <p>{node.text}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SquareRenderer;
