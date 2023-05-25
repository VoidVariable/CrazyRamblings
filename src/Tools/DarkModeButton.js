import React, { useState, useEffect } from 'react';
import './DarkModeButton.css';

const DarkModeButton = ({ isDarkMode, onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timeoutId = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isAnimating]);

  const handleButtonClick = () => {
    setIsAnimating(true);

    setTimeout(() => {
      onClick();
    }, 320); // Wait for the animation duration before triggering onClick
  };

  const iconClassName = isDarkMode ? 'fa-sun' : 'fa-moon';
  const buttonClassName = `moon-icon-button ${isAnimating ? 'animate' : ''}`;

  return (
    <button className={buttonClassName} onClick={handleButtonClick}>
      <i className={`fa ${iconClassName}`}></i>
    </button>
  );
};

export default DarkModeButton;
