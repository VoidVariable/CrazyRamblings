import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

class SquareRenderer extends React.Component {
  render() {
    const { nodes } = JSON.parse(this.props.canvasData);

    return (
      <div>
        {nodes.map((node) => {
           const leftPosition = `${this.props.point.x + (node.x) + node.width / 2}px`;
          const topPosition = `${this.props.point.y + (node.y)+ node.height / 2}px`;

          return (
            <div
              key={node.id}
              style={{
                borderRadius: 7,
                borderWidth: 1,
                borderColor: '#989',
                position: 'absolute',
                borderStyle: 'solid',
                left: leftPosition,
                top: topPosition,
                transform: 'translate(-50%, -50%)',
                fontSize: 20,
                width: `${node.width}px`,
                height: `${node.height}px`,
                backgroundColor: '#191721',
                color: '#aaa',
                zIndex: 0,
                padding: 10, // Add desired padding value here
                boxSizing: 'border-box', // Ensure padding is included in the width and height
              }}
            >
              <MarkdownRenderer terms={node.text} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default SquareRenderer;
