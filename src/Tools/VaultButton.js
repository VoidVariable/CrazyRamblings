import React from 'react';
import './VaultButton.css';

function VaultButton({ label, handleClick, style }) {
 
  return (
    <button className="vault-button" onClick={handleClick} style={style}>
      {label}
    </button>
  );
}

export default VaultButton;
