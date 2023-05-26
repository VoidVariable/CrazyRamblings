import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

class SquareRenderer extends React.Component {
  renderEdges() {
    const { edges, nodes } = JSON.parse(this.props.canvasData);
    const { point, zoomLevel } = this.props;
  
    const markerId = 'arrowMarker';
    const markerSize = 20;
  
    return (
      <svg style={{ position: 'absolute', zIndex: 0, width: '100%', height: '100%' }}>
        <defs>
          <marker
            id={markerId}
            markerWidth={markerSize}
            markerHeight={markerSize}
            refX={markerSize * 0.8}
            refY={markerSize * 0.3}
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d={`M0,0 L0,${markerSize * 0.6} L${markerSize * 0.9},${markerSize * 0.3} z`} fill="#989" />
          </marker>
        </defs>
        {edges.map((edge) => {
          const fromNode = nodes.find((node) => node.id === edge.fromNode);
          const toNode = nodes.find((node) => node.id === edge.toNode);
  
          const fromX = (point.x + fromNode.x + fromNode.width / 2) * zoomLevel;
          const fromY = (point.y + fromNode.y + fromNode.height / 2) * zoomLevel;
  
          const posNodeX = 
            ((point.x + toNode.x) * zoomLevel) + (toNode.width * zoomLevel) / 2;
          const posNodeY = 
            ((point.y + toNode.y) * zoomLevel) + (toNode.height * zoomLevel) / 2;
            

          let toX, toY;
          if (edge.toSide === 'left') {
            toX = (posNodeX - (toNode.width* zoomLevel)/ 2) - 10; // Adjusted to the left edge of the node
            toY = (point.y + toNode.y + toNode.height / 2) * zoomLevel;
          } else if (edge.toSide === 'right') {
            toX = (posNodeX + (toNode.width* zoomLevel)/ 2) - 10;  // Adjusted to the right edge of the node
            toY = (point.y + toNode.y + toNode.height / 2) * zoomLevel;
          } else if (edge.toSide === 'top') {
            toX = (point.x + toNode.x + toNode.width / 2) * zoomLevel;
            toY = posNodeY - (toNode.height * zoomLevel) / 2 - 38;  // Adjusted to the top edge of the node
          } else if (edge.toSide === 'bottom') {
            toX = (point.x + toNode.x + ((toNode.width / 2)) ) * zoomLevel;
            toY = posNodeY + (toNode.height * zoomLevel) / 2 - 30;  // Adjusted to the bottom edge of the node
          }
  
          const arrowFromX = fromX;
          const arrowFromY = fromY;
          const arrowToX = toX;
          const arrowToY = toY;
  
          return (
            <line
              key={edge.id}
              x1={arrowFromX}
              y1={arrowFromY}
              x2={arrowToX}
              y2={arrowToY}
              stroke="#989"
              strokeWidth={3 * zoomLevel}
              markerEnd={`url(#${markerId})`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </svg>
    );
  }
  
  
  
  
  
  
  

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
                zIndex: 1,
                padding: 20 * zoomLevel * zoomRatio,
                boxSizing: 'border-box',
              }}
            >
              <MarkdownRenderer terms={node.text} />
            </div>
          );
        })}
        {this.renderEdges()}
      </div>
    );
  }
}

export default SquareRenderer;
