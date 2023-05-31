import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import './Nodes.css'

class SquareRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNode : null
    };
  }


  selectNode(node) 
  {
    const {selectedNode} = this.state;

    const isSelected = selectedNode === node.id;
    
    if(!isSelected)
      this.setState({ selectedNode: node.id });
    else
    {
      this.props.onVisiblePointChange(this.getVPNodeCenter(node));
    }
  }


  getVPNodeCenter(node) 
  {
   // const {zoomLevel } = this.props;
  
    const scaledX = node.x;
    const scaledY = node.y;

    const scaledWidth = node.width;
    const scaledHeight = node.height;
  
    const centerCoordinates = {
      x: -scaledX + (1920 / 2) - (scaledWidth / 2),
      y: -scaledY + (1080 / 2) - (scaledHeight / 2),
    };
    
    return { coordinates: centerCoordinates, zoom: 1};
  }


  renderEdges() {
    const { edges, nodes } = JSON.parse(this.props.canvasData);
    const { point, zoomLevel } = this.props;

    const markerId = 'arrowMarker';
    const markerSize = 10;

    const curveRadius = 50; // Adjust this value to control the curvature of the edges

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
            toX = (posNodeX - (toNode.width * zoomLevel) / 2) - 10; // Adjusted to the left edge of the node
            toY = (point.y + toNode.y + toNode.height / 2) * zoomLevel;
          } else if (edge.toSide === 'right') {
            toX = (posNodeX + (toNode.width * zoomLevel) / 2) - 10;  // Adjusted to the right edge of the node
            toY = (point.y + toNode.y + toNode.height / 2) * zoomLevel;
          } else if (edge.toSide === 'top') {
            toX = (point.x + toNode.x + toNode.width / 2) * zoomLevel;
            toY = posNodeY - (toNode.height * zoomLevel) / 2 - 38;  // Adjusted to the top edge of the node
          } else if (edge.toSide === 'bottom') {
            toX = (point.x + toNode.x + ((toNode.width / 2))) * zoomLevel;
            toY = posNodeY + (toNode.height * zoomLevel) / 2 - 30;  // Adjusted to the bottom edge of the node
          }

          const arrowFromX = fromX;
          const arrowFromY = fromY;
          const arrowToX = toX;
          const arrowToY = toY;

          const controlPointX1 = fromX + (toX - fromX) / 2 - curveRadius; // Control point on the x-axis
          const controlPointY1 = fromY + (toY - fromY) / 2 - curveRadius; // Control point on the y-axis
          const controlPointX2 = fromX + (toX - fromX) / 2 + curveRadius; // Control point on the x-axis
          const controlPointY2 = fromY + (toY - fromY) / 2 + curveRadius; // Control point on the y-axis

          return (
            <path
              key={edge.id}
              d={`M ${arrowFromX},${arrowFromY} C ${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${arrowToX},${arrowToY}`}
              fill="none"
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

  renderNodes() {
    const {selectedNode} = this.state;
    const { nodes } = JSON.parse(this.props.canvasData);
    const { point, zoomLevel, zoomRatio } = this.props;

    return nodes.map((node) => {
      const scaledWidth = node.width * zoomLevel;
      const scaledHeight = node.height * zoomLevel;
      const scaledX = (point.x + node.x) * zoomLevel;
      const scaledY = (point.y + node.y) * zoomLevel;
      const leftPosition = `${scaledX + scaledWidth / 2}px`;
      const topPosition = `${scaledY + scaledHeight / 2}px`;


      var buttonClassName = selectedNode !== node.id ? 'node' : 'node selected';

      return (
        <span
          onClick={() => this.selectNode(node)}
          key={node.id}
          className={buttonClassName}
          style={{
            left: leftPosition,
            top: topPosition,
            fontSize: 18 * zoomLevel,
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            padding: 20 * zoomLevel * zoomRatio,
          }}
        >
          <MarkdownRenderer terms={node.text} />
        </span>
      );
    });
  }
  

  render() {
  
   return (
    <div>
       
      {this.renderNodes()}
      {this.renderEdges()}
    </div>
    );
  }
}

export default SquareRenderer;
