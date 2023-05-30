import React from 'react';
import "./CanvasFileDisplay.css";
import fetchingData from './dataFetcher';
import SquareRenderer from './SquareRenderer';

class CanvasFileDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasData: null,
      error: null,
      visiblePoint: { x: 0, y: 0 },
      zoomLevel: 1,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      zoomRatio : 1
    };
  }


  updateVisiblePoint = (newPoint) => {
    this.setState({ visiblePoint: newPoint });
  };


  componentDidMount() {
    this.fetchImageData();
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('wheel', this.handleWheel, { passive: false });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('wheel', this.handleWheel);
  }


  handleMouseDown = (event) => {
    if (event.button === 1) { // Check if middle mouse button (wheel) is clicked
      event.preventDefault();
      this.setState({
        isDragging: true,
        lastMouseX: event.clientX,
        lastMouseY: event.clientY,
      });
    }
  };

  handleMouseMove = (event) => {
    if (this.state.isDragging) {
      const deltaX = event.clientX - this.state.lastMouseX;
      const deltaY = event.clientY - this.state.lastMouseY;

      // Perform necessary calculations based on deltaX and deltaY
      // Update the visiblePoint in the state accordingly
      this.setState((prevState) => ({
        visiblePoint: {
          x: prevState.visiblePoint.x + deltaX / prevState.zoomLevel,
          y: prevState.visiblePoint.y + deltaY / prevState.zoomLevel,
        },
        lastMouseX: event.clientX,
        lastMouseY: event.clientY,
      }));
    }
  };

  handleMouseUp = (event) => {
    if (event.button === 1) { // Check if middle mouse button (wheel) is released
      event.preventDefault();
      this.setState({ isDragging: false });
    }
  };


  handleWheel = (event) => {
    event.preventDefault();
  
    const zoomFactor = 0.1; // Adjust the zoom speed as desired
    let newZoomLevel = this.state.zoomLevel;
  
    if (event.ctrlKey) {
      // Zoom in or out
      if (event.deltaY < 0) {
        // Zoom in
        newZoomLevel += zoomFactor;
      } else {
        // Zoom out
        newZoomLevel -= zoomFactor;
        newZoomLevel = Math.max(newZoomLevel, 0.1); // Prevent zooming out beyond a certain level
      }
  
      const zoomDelta = newZoomLevel - this.state.zoomLevel;
      const newZoomRatio = newZoomLevel / this.state.zoomLevel;
  
      const mouseX = event.clientX - event.target.getBoundingClientRect().left;
      const mouseY = event.clientY - event.target.getBoundingClientRect().top;
  
      // Adjust the visible point based on zooming and mouse position
      this.setState((prevState) => ({
        visiblePoint: {
          x: prevState.visiblePoint.x - mouseX * zoomDelta,
          y: prevState.visiblePoint.y - mouseY * zoomDelta,
        },
        zoomLevel: newZoomLevel,
        zoomRatio: newZoomRatio, // Update the zoomRatio in the state
      }));
    } else {
      // Scroll the screen up or down
      const scrollFactor = 50; // Adjust the scroll speed as desired
      const scrollAmount = event.deltaY > 0 ? scrollFactor : -scrollFactor;
  
      this.setState((prevState) => ({
        visiblePoint: {
          x: prevState.visiblePoint.x,
          y: prevState.visiblePoint.y + scrollAmount / prevState.zoomLevel,
        },
      }));
    }
  };
  
  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.fetchImageData();
    }
  }

  fetchImageData = async () => {
    try {
      const markdownData = await fetchingData('text', this.props.path, true);

      this.setState({ canvasData: markdownData });
      // Do something with the markdownData, such as displaying it in the component state or rendering it.
    } catch (error) {
      // Handle any errors that occur during the fetch.
      console.error('Error fetching Markdown data:', error);
    }
  };

  findNodeClosestToMiddle = () => {
    const { nodes } = JSON.parse(this.state.canvasData);
  
    if (!this.state.canvasData || !nodes.length) {
      return;
    }
  
    const canvasElement = document.getElementsByClassName("canvas-file-display")[0];
    const canvasWidth = canvasElement.offsetWidth;
    const canvasHeight = canvasElement.offsetHeight;
    const middleX = canvasWidth / 2;
    const middleY = canvasHeight / 2;
    const { zoomLevel } = this.state;
  
    let closestNode = nodes[0];
    let closestDistance = this.getDistance(middleX, middleY, closestNode.x, closestNode.y);
  
    for (let i = 1; i < nodes.length; i++) {
      const node = nodes[i];
      const distance = this.getDistance(middleX, middleY, node.x, node.y);
  
      if (distance < closestDistance) {
        closestNode = node;
        closestDistance = distance;
      }
    }
  
    const offsetX = (middleX - closestNode.x * zoomLevel) + canvasWidth / 2; // Add half the width of CanvasFileDisplay
    const offsetY = (middleY - closestNode.y * zoomLevel) + canvasHeight / 2; // Add half the height of CanvasFileDisplay
  
    this.setState({
      visiblePoint: {
        x: offsetX,
        y: offsetY,
      },
    });
  };
  
  
  getDistance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  };


  render() {
    const { canvasData, visiblePoint, zoomLevel, zoomRatio } = this.state;
    const zoomPercentage = Math.round(zoomLevel * 100);
  
    return (
      <div
        className="canvas-file-display"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onWheel={this.handleWheel}
      >
        {canvasData !== null && (
          <SquareRenderer 
          canvasData={this.state.canvasData} 
          point={visiblePoint} 
          zoomLevel={zoomLevel} 
          zoomRatio={zoomRatio}
          onVisiblePointChange={this.updateVisiblePoint} />
        )}
        <div className="zoom-level-text">{zoomPercentage}%</div> {/* Added zoom level text */}
        <div className="floating-buttons">
          <button className="floating-button">
            <i className="fas fa-search"></i>
          </button>
          <button className="floating-button" onClick={() => alert(canvasData)}>
            <i className="fas fa-info-circle"></i>
          </button>
          <button className="floating-button">
            <i className="fas fa-expand-arrows-alt"></i>
          </button>
          <button className="floating-button" onClick={() => this.findNodeClosestToMiddle()}>
            <i className="fas fa-arrows-to-dot"></i>
          </button>
        </div>
      </div>
    );
  }
  
}

export default CanvasFileDisplay;
