const express = require('express');
const { getWeather, getRoute, getPlaces } = require('../controllers/apiController');
const router = express.Router();

router.get('/weather', getWeather);
router.get('/route', getRoute);
router.get('/places', getPlaces);

module.exports = router;
