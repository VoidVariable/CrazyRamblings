import React from 'react';
import './App.css';
import Header from './Tools/Header';
import MarkdownDisplay from './Tools/MarkdownDisplay';

const App = () => {
  return (
    <div className="container">
    
    <div className='Header'>
      <Header />
    </div>

    <div className="middle-section">
      <div className="left-section">
        {/* Left section content */}
      </div>
  
      <div className="middle-markdown">
        <MarkdownDisplay />
      </div>
  
      <div className="right-section">
        {/* Right section content */}
      </div>
    </div>
  
    <footer className="footer">
      {/* Footer content */}
    </footer>
    
  </div>
  );
};
export default App;