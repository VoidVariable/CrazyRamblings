import React from 'react';
import "./CanvasFileDisplay.css";
import fetchingData from './dataFetcher';

class CanvasFileDisplay extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        canvasData: null,
        error: null
    };
    }
    
    componentDidMount() {
    this.fetchImageData();
    }

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
    const { path } = this.props;
     
    return (
        <div className="canvas-file-display">
        <label>Path: {path}</label>
        <div className='canvas-warning'>File type not Implement {this.state.canvasData}</div>
      </div>
    );
  }
}

export default CanvasFileDisplay;
