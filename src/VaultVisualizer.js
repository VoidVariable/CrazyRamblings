import React, { useState, useEffect } from 'react';
import Header from './Tools/Header';
import MiddleContent from './Tools/MiddleContent';
import FileDisplay from './Tools/FileDisplay';
import './App.css'
import { useParams } from 'react-router-dom';
import { setVault } from './Tools/dataFetcher';

const VaultVisualizer = () => {
  const [path, setPath] = useState('null');
  const { vault } = useParams();

  useEffect(() => {
    setVault(vault);
  }, [vault]);

  const handlePathChange = (newPath) => {
    setPath(newPath);
  };

  return (
    <div className="vault-visualizer">
      <div style={{height: '6vh'}}>
      <Header/>
      </div>
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
