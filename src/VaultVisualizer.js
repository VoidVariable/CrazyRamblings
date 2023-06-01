import React, { useState, useEffect } from 'react';
import Header from './Tools/Header';
import MiddleContent from './Tools/MiddleContent';
import FileDisplay from './Tools/FileDisplay';
import MissingVaultPage from './Tools/MissingVaultPage';
import './App.css';
import { useParams } from 'react-router-dom';
import { setVault, checkFetchability } from './Tools/dataFetcher';

const VaultVisualizer = () => {
  const [path, setPath] = useState('null');
  const [fetchStatus, setFetchStatus] = useState('pending');
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const { vault } = useParams();

  useEffect(() => {
    setVault(vault);
    checkFetchability()
      .then(result => {
        setFetchStatus('done');
        setIsFetchSuccessful(result);
      })
      .catch(error => {
        setFetchStatus('done');
        setIsFetchSuccessful(false);
      });
  }, [vault]);

  const handlePathChange = (newPath) => {
    setPath(newPath);
  };

  if (fetchStatus === 'pending') {
    return <div>Loading...</div>;
  }

  if (!isFetchSuccessful) {
    return <MissingVaultPage />;
  }

  return (
    <div className="vault-visualizer">
      <div style={{ height: '60px' }}>
        <Header />
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
