const { fetchWeather, fetchRoute, fetchPlaces } = require('../utils/apiService');

exports.getWeather = async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await fetchWeather(lat, lon);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
};

exports.getRoute = async (req, res) => {
  const { startLon, startLat, endLon, endLat } = req.query;
  try {
    const response = await fetchRoute(startLon, startLat, endLon, endLat);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch route data' });
  }
};

exports.getPlaces = async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await fetchPlaces(lat, lon);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch places data' });
  }
};
