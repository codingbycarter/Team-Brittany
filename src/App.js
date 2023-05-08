import React from 'react';
import './App.css';
import Weather from './components/Weather';
import HikingTrails from './components/HikingTrails';

function App() {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Weather />
      <HikingTrails />
    </div>
  );
}

export default App;
