const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

// Create Review (POST)
router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Reviews (GET)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user')
      .populate('roadTrip');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Review (GET)
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user')
      .populate('roadTrip');
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Review (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Review (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
