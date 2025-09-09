const axios = require('axios');

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
const openRouteApiKey = process.env.OPENROUTESERVICE_API_KEY;
const foursquareApiKey = process.env.FOURSQUARE_API_KEY;

exports.fetchWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;
  return axios.get(url);
};

exports.fetchRoute = async (startLon, startLat, endLon, endLat) => {
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
  return axios.post(
    url,
    {
      coordinates: [
        [parseFloat(startLon), parseFloat(startLat)],
        [parseFloat(endLon), parseFloat(endLat)],
      ],
    },
    {
      headers: {
        Authorization: openRouteApiKey,
        'Content-Type': 'application/json',
      },
    }
  );
};

exports.fetchPlaces = async (lat, lon) => {
  const url = `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&limit=5`;
  return axios.get(url, {
    headers: {
      Authorization: foursquareApiKey,
    },
  });
};
