import React, { Component } from 'react';
import fetchingData from './dataFetcher';

class ImageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
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
      const imageData = await fetchingData('arraybuffer', this.props.path, true);
      this.setState({ imageData });
    } catch (error) {
      console.error('Error fetching image data:', error);
      this.setState({ error });
    }
  };

  render() {
    const { imageData, error } = this.state;

    if (error) {
      return <div>Error fetching image data: {error.message}</div>;
    }

    if (!imageData) {
      return <div>Loading image...</div>;
    }

    let mimeType = 'image/png';
    if (this.props.path.endsWith('.jpeg') || this.props.path.endsWith('.jpg')) {
      mimeType = 'image/jpeg';
    }
    // Add more conditions for other image formats if necessary

    const base64Image = btoa(
      new Uint8Array(imageData)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    return (
      <img
        style={{
          overflowY: 'auto',
          maxWidth: '100%',
          maxHeight: '800px',
          boxSizing: 'border-box',
          padding: '10px',
          paddingTop: '2%'
        }}
        src={`data:${mimeType};base64,${base64Image}`}
        alt=""
      />
    );
  }
}

export default ImageDisplay;
