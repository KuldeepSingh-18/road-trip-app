// routes/trips.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trip = require('../models/Trip');

// Create a trip
router.post('/', async (req, res) => {
  try {
    const { title, startLocation, endLocation } = req.body;
    if (!title || !startLocation || !endLocation) {
      return res.status(400).json({ error: 'title, startLocation and endLocation are required' });
    }
    const trip = new Trip(req.body);
    await trip.save();
    return res.status(201).json(trip);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get all trips (you can add query params for filtering/pagination)
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 }).limit(200);
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single trip by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a trip
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
    const updated = await Trip.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Trip not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a trip
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
    const deleted = await Trip.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
