import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

import fetchingData from './dataFetcher';

class MarkdownDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { terms: null };
  }

  componentDidMount() {
    this.fetchMarkdownData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.fetchMarkdownData();
    }
  }

  fetchMarkdownData = async () => {
    try {
      const markdownData = await fetchingData('text', this.props.path, true);
      this.setState({ terms: markdownData });
      // Do something with the markdownData, such as displaying it in the component state or rendering it.
    } catch (error) {
      // Handle any errors that occur during the fetch.
      console.error('Error fetching Markdown data:', error);
    }
  };

  render() {
    return (
      <div className="mdContent">
        <MarkdownRenderer terms={this.state.terms} />
      </div>
    );
  }
}

export default MarkdownDisplay;
