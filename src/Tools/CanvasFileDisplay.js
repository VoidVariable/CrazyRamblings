import React from 'react';

class CanvasFileDisplay extends React.Component {
  render() {
    const { path } = this.props;

    return (
      <div>
        <label>Path: {path}</label>
      </div>
    );
  }
}

export default CanvasFileDisplay;
