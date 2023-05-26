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
        x: prevState.visiblePoint.x - (mouseX * zoomDelta),
        y: prevState.visiblePoint.y - (mouseY * zoomDelta),
      },
      zoomLevel: newZoomLevel,
      zoomRatio: newZoomRatio, // Update the zoomRatio in the state
    }));

  };
  

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.fetchImageData();
    }
  }

  fetchImageData = async () => {
    try {
      const markdownData = await fetchingData('text', this.props.path);

      this.setState({ canvasData: markdownData });
      // Do something with the markdownData, such as displaying it in the component state or rendering it.
    } catch (error) {
      // Handle any errors that occur during the fetch.
      console.error('Error fetching Markdown data:', error);
    }
  };

  render() {
    const { canvasData, visiblePoint, zoomLevel, zoomRatio } = this.state;

    return (
      <div
        className="canvas-file-display"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onWheel={this.handleWheel}
      >
        {canvasData !== null && (
          <SquareRenderer canvasData={this.state.canvasData} point={visiblePoint} zoomLevel={zoomLevel} zoomRatio={zoomRatio} />
        )}
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
        </div>
      </div>
    );
  }
}

export default CanvasFileDisplay;
