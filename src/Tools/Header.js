import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/" className="header-title">
        Crazy Ramblings Of a Mad Mind
      </Link>
      <div className="header-button">
        <DarkModeButton isDarkMode={isDarkMode} onClick={toggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;
