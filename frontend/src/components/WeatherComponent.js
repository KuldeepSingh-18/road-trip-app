import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchWeather();
  }, [lat, lon]);

  return (
    <div>
      {weatherData ? (
        <div>
          <h3>Current Weather</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading Weather Data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
