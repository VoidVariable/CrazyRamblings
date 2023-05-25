import React from 'react';
import "./CanvasFileDisplay.css";

class CanvasFileDisplay extends React.Component {
  render() {
    const { path } = this.props;

    return (
        <div className="canvas-file-display">
        <label>Path: {path}</label>
        <div className='canvas-warning'>File type not Implement</div>
      </div>
    );
  }
}

export default CanvasFileDisplay;
