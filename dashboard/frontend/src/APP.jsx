import React from 'react';
import PriceChart from './components/PriceChart';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1f77b4' }}>
        Brent Oil Change Point Dashboard
      </h1>
      <PriceChart />
    </div>
  );
}

export default App;