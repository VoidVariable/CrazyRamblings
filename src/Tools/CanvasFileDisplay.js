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
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      lastTouch1X: 0,
      lastTouch1Y: 0,
      lastTouch2X: 0,
      lastTouch2Y: 0,
    };
  }

  componentDidMount() {
    this.fetchImageData();
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
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
          x: prevState.visiblePoint.x + deltaX,
          y: prevState.visiblePoint.y + deltaY,
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
    return (
      <div
        className="canvas-file-display"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        {this.state.canvasData !== null && (
          <SquareRenderer
            canvasData={this.state.canvasData}
            point={this.state.visiblePoint}
          />
        )}
      </div>
    );
  }
}

export default CanvasFileDisplay;
