import React, { useState } from 'react';
import './Header.css';
import DarkModeButton from './DarkModeButton';
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
            Crazy Ramblings Of a Mad Mind
          </div>
          <div className="header-button">
          <DarkModeButton isDarkMode={isDarkMode} onClick={toggleDarkMode} />
      </div>
        </header>
    );
  };
  
  export default Header;