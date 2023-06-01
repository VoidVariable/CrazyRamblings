import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import VaultVisualizer from './VaultVisualizer';
import Header from './Tools/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/vault-visualizer/:vault" element={<VaultVisualizer />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
