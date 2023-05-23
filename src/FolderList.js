import React, { useState, useEffect } from 'react';

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch the list of folders
    const fetchFolders = async () => {
      try {
        const handle = await window.showDirectoryPicker();
        const folders = [];

        for await (const entry of handle.values()) {
          if (entry.kind === 'directory') {
            folders.push(entry.name);
          }
        }

        setFolders(folders);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFolders();
  }, []);

  if (error) {
    return <div>Error fetching folders: {error}</div>;
  }

  return (
    <div>
      {folders.map((folder, index) => (
        <div key={index}>{folder}</div>
      ))}
    </div>
  );
};

export default FolderList;