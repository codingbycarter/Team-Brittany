import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { coords } = await getPosition();
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
        );
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);

  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Current Weather</h2>
      <p>
        {weather.name}: {weather.main.temp}°F, {weather.weather[0].description}
      </p>
    </div>
  );
};

export default Weather;
