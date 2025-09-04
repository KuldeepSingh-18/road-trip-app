const express = require('express');
const RoadTrip = require('../models/RoadTrip');

const router = express.Router();

// Create RoadTrip (POST)
router.post('/', async (req, res) => {
  try {
    const newTrip = await RoadTrip.create(req.body);
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Trips (GET)
router.get('/', async (req, res) => {
  try {
    const trips = await RoadTrip.find()
      .populate('createdBy')
      .populate('reviews');
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Trip (GET)
router.get('/:id', async (req, res) => {
  try {
    const trip = await RoadTrip.findById(req.params.id)
      .populate('createdBy')
      .populate('reviews');
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Trip (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedTrip = await RoadTrip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Trip (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await RoadTrip.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
