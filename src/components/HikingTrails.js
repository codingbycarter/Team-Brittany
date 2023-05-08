import React, { useState, useEffect } from 'react';
import axios from 'axios';
import trailsData from '../trails.json';

const HikingTrails = () => {
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
    <div>
      <h2>Hiking Trails</h2>
      <select onChange={handleTrailChange}>
        <option>Select a trail</option>
        {trails.map((trail) => (
          <option key={trail.id}>{trail.name}</option>
        ))}
      </select>
      {selectedTrail && (
        <div>
          <h3>{selectedTrail.name}</h3>
          <p>Location: {selectedTrail.location}</p>
          <p>Length: {selectedTrail.length} miles</p>
          <p>Difficulty: {selectedTrail.difficulty}</p>
        </div>
      )}
      {trailWeather && (
        <p>
          {trailWeather.name}: {trailWeather.main.temp}°F,{' '}
          {trailWeather.weather[0].description}
        </p>
      )}
    </div>
  );
};

export default HikingTrails;
