import React from 'react';
import "./CanvasFileDisplay.css";
import fetchingData from './dataFetcher';
import SquareRenderer from './SquareRenderer';

    
const jsonConfig = {
    "nodes": [
      {"id": "434270d0bbe1d352", "x": 0, "y": 0, "width": 250, "height": 60, "type": "text", "text": "sdfd sdsd sld sm sd sdlm sdsd msld mlsdm lsdm lsmd lsmd lsmd lm sldm sldmlsdm lsmd lms"},
      {"id": "asasdasd", "x": -20, "y": -20, "width": 250, "height": 60, "type": "text", "text": "sdfd sdsd sld sm sd sdlm sdsd msld mlsdm lsdm lsmd lsmd lsmd lm sldm sldmlsdm lsmd lms"},
    ]
};

class CanvasFileDisplay extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        canvasData: null,
        error: null,
        visiblePoint: { x: 0, y: 0 }, // Initialize visiblePoint
        isDragging: false,
        lastMouseX: 0,
        lastMouseY: 0,
      };
    }
   
    componentDidMount() 
    {
        this.fetchImageData();
        document.addEventListener('wheel', this.handleMouseWheel);
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchmove', this.handleTouchMove);
        document.addEventListener('touchend', this.handleTouchEnd);
    }

    componentWillUnmount() {
        document.removeEventListener('wheel', this.handleMouseWheel);
        document.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
      }

    handleMouseWheel = (event) => {
    event.preventDefault();
    const { deltaX, deltaY } = event;

    // Perform necessary calculations based on deltaX and deltaY
    // Update the visiblePoint in the state accordingly
    this.setState((prevState) => ({
        visiblePoint: {
        x: prevState.visiblePoint.x - deltaX,
        y: prevState.visiblePoint.y - deltaY,
        },
    }));
    };

    handleTouchStart = (event) => {
        if (event.touches.length === 2) {
          event.preventDefault();
          const touch1 = event.touches[0];
          const touch2 = event.touches[1];
    
          this.setState({
            isDragging: true,
            lastTouch1X: touch1.clientX,
            lastTouch1Y: touch1.clientY,
            lastTouch2X: touch2.clientX,
            lastTouch2Y: touch2.clientY,
          });
        }
    };
    
    handleTouchMove = (event) => {
    if (this.state.isDragging && event.touches.length === 2) {
      event.preventDefault();
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];

      const deltaX1 = touch1.clientX - this.state.lastTouch1X;
      const deltaY1 = touch1.clientY - this.state.lastTouch1Y;
      const deltaX2 = touch2.clientX - this.state.lastTouch2X;
      const deltaY2 = touch2.clientY - this.state.lastTouch2Y;

        // Perform necessary calculations based on deltaX and deltaY
        // Update the visiblePoint in the state accordingly
        this.setState((prevState) => ({
            visiblePoint: {
            x: (prevState.visiblePoint.x - (deltaX1 + deltaX2)), 
            y: (prevState.visiblePoint.y - (deltaY1 + deltaY2)),
            },
            lastTouch1X: touch1.clientX,
            lastTouch1Y: touch1.clientY,
            lastTouch2X: touch2.clientX,
            lastTouch2Y: touch2.clientY,
        }));
      }
    };

    handleTouchEnd = (event) => {
        if (event.touches.length < 2) {
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
    const { path, } = this.props;
     
    return (
        <div
        className="canvas-file-display"
        onWheel={this.handleMouseWheel}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {/* <label>Path: {path}</label>
        <div className='canvas-warning'>File type not Implement {this.state.canvasData}</div> */}
        <SquareRenderer config={jsonConfig} point={this.state.visiblePoint}/>
      </div>
    );
  }
}

export default CanvasFileDisplay;
