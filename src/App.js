import React from 'react';
import './App.css';
import Header from './Tools/Header';
import MarkdownDisplay from './Tools/MarkdownDisplay';

const App = () => {
  return (
    <div>

      <Header /> 
        
      <div className="markdown-container">
        <MarkdownDisplay />
      </div>
      
      <footer className="footer">
        {/* Footer content */}
      </footer>

    </div>
  );
};
export default App;