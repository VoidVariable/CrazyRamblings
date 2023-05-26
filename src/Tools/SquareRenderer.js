import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

class SquareRenderer extends React.Component {
  render() {
    const { nodes } = JSON.parse(this.props.canvasData);
    const { point, zoomLevel, zoomRatio } = this.props;

    return (
      <div>
        {nodes.map((node) => {
          const scaledWidth = node.width * zoomLevel;
          const scaledHeight = node.height * zoomLevel;
          const scaledX = (point.x + node.x) * zoomLevel;
          const scaledY = (point.y + node.y) * zoomLevel;
          const leftPosition = `${scaledX + scaledWidth / 2}px`;
          const topPosition = `${scaledY + scaledHeight / 2}px`;

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
                fontSize: 18 * zoomLevel,
                width: `${scaledWidth}px`,
                height: `${scaledHeight}px`,
                backgroundColor: '#191721',
                color: '#aaa',
                zIndex: 0,
                padding: 20 * zoomLevel * zoomRatio, // Adjust padding based on zoom level and zoom ratio
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
