import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setRep } from './Tools/dataFetcher';
import MarkdownRenderer from './Tools/MarkdownRenderer';
import VaultButton from './Tools/VaultButton';
import './Tools/HomeScreen.css';
import { vaultButtons } from './Tools/buttonsDef';

function HomeScreen() {
  const navigate = useNavigate();

  const handleButtonClick = (link, name) => {
    setRep(link, name);
    
    navigate('/vault-visualizer/'+ name);
  };

  const calculateGridPosition = (index) => {
    const columnCount = 3; // Adjust the number of columns as needed
    const row = Math.floor(index / columnCount) + 1;
    const column = (index % columnCount) + 1;
    return `${row} / ${column}`;
  };

  const textEnter = "## Hi! Welcome to ... this.  <h4>This site stores a bunch of data related to video game theories in a obsidian vault like format.</h4> <br> You can look around connection boards of info and other simple files.";
  

  return (
    <div className="home-screen" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="top-section" style={
        {
          flexDirection: 'column',
          backgroundColor: '#282c34',
          flex: 0.3,
          paddingTop: '30px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <MarkdownRenderer terms={textEnter}></MarkdownRenderer>
      </div>
      <div className="bottom-section" style={{
        backgroundColor: '#1f2329',
        color: '#c8d1e2',
        flex: 0.7,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <input type="text" placeholder="Search" style={
          {
            width: '50%',
            height: '3%',
            marginTop: '20px',
            padding: '0.5rem'
          }} />
        <div className="vault-button-grid" style={{
          marginTop: '120px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr', // Adjust the number of columns as needed
          gridGap: '20px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {vaultButtons.map((vaultButton, index) => (
            <VaultButton
              key={vaultButton.id}
              label={vaultButton.label}
              handleClick={() => handleButtonClick(vaultButton.link, vaultButton.name)}
              style={{ gridArea: calculateGridPosition(index) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
