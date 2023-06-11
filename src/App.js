import React, { useState, useEffect } from 'react';
import axios from 'axios';
import trailsData from './trails.json';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './App.css';


const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

const App = () => {
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [trailWeather, setTrailWeather] = useState(null);
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    setTrails(trailsData.trails);
  }, []);

  const handleTrailChange = async (event) => {
    const trail = trails.find((t) => t.name === event.target.value);
    setSelectedTrail(trail);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${trail.lat}&lon=${trail.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
    );
    setTrailWeather(response.data);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <h2>Hiking Trails</h2>
      <select onChange={handleTrailChange}>
        <option>---Select a trail---</option>
        {trails.map((trail, index) => (
          <option key={index}>{trail.name}</option>
        ))}
      </select>
      {trailWeather && (
        <p>
          {trailWeather.name}: {trailWeather.main.temp}°F,{' '}
          {trailWeather.weather[0].description}
        </p>
      )}
      {selectedTrail && (
        <div>
          <h2>Trail Map</h2>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat: selectedTrail.lat,
                lng: selectedTrail.lon,
              }}
              zoom={14}
            >
              <Marker
                position={{
                  lat: selectedTrail.lat,
                  lng: selectedTrail.lon,
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
};

export default App;
