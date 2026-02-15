import React from 'react';
import PriceChart from './components/PriceChart';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Brent Oil Change Point Dashboard</h1>
        <p>Interactive visualization of Brent prices (2010+) with detected structural breaks</p>
      </header>
      <main>
        <PriceChart />
      </main>
    </div>
  );
}

export default App;