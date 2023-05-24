import {useState} from 'react';
import './App.css';
import Header from './Tools/Header';
import MarkdownDisplay from './Tools/MarkdownDisplay';
import FileDisplay from './Tools/FileDisplay';

const App = () => {
  const [selectedPath, setSelectedPath] = useState(null);

  const handlePathChange = () => {
    console.log("hmm");
    // Logic to change the path based on your requirements
    const newPath = '.temp.md';
    setSelectedPath(newPath);
  };


  return (
    <div className="container">
    
    <div className='Header'>
      <Header />
    </div>

    <div className="middle-section">
      <div className="left-section">
        <FileDisplay />
      </div>
  
      <div className="middle-markdown">
          <MarkdownDisplay path={selectedPath} />
      </div>
  
      <div className="right-section">
      <button onClick={handlePathChange} style={{ marginTop: '50px' }}>
            Change Path
          </button>
      </div>
    </div>
  
    <footer className="footer">
      {/* Footer content */}
    </footer>
    
  </div>
  );
};
export default App;