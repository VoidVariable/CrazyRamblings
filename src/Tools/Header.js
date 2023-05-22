import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
  
    return (
        <header className={`header`}>
          <div>
            {/* Header content */}
          </div>
          <div className="header-title">
            Title
          </div>
          <div className="header-button">
            <button className="moon-icon-button" onClick={toggleDarkMode}>
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </header>
    );
  };
  
  export default Header;