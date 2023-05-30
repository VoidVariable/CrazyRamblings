import React, { useState } from 'react';
import Header from './Tools/Header';
import MiddleContent from './Tools/MiddleContent';
import FileDisplay from './Tools/FileDisplay';
import './App.css'

const VaultVisualizer = () => {
  const [path, setPath] = useState('null');

  const handlePathChange = (newPath) => {
    setPath(newPath);
  };

  return (
    <div className="vault-visualizer">
      <Header />
      <div className="middle-section">
        <div className="left-section">
          <FileDisplay handlePathChange={handlePathChange} />
        </div>
        <div className="middle-markdown">
          <MiddleContent path={path} />
        </div>
      </div>
    </div>
  );
};

export default VaultVisualizer;
