import React from 'react';

const EmbeddedIframe = ({ iframeCode }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: iframeCode }} />
  );
};

export default EmbeddedIframe;
