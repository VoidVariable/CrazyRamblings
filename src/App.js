import {useState} from 'react';
import './App.css';
import Header from './Tools/Header';
import MarkdownDisplay from './Tools/MarkdownDisplay';
import FileDisplay from './Tools/FileDisplay';

const App = () => {
  const [path, setPath] = useState('null');

  const handlePathChange = (newPath) => {
    console.log("Ch -CH");
    setPath(newPath);
  };


  return (
    <div className="container">
    
    <div className='Header'>
      <Header />
    </div>

    <div className="middle-section">
      <div className="left-section">
        <FileDisplay handlePathChange={handlePathChange} />
      </div>
  
      <div className="middle-markdown">
          <MarkdownDisplay path={path} />
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