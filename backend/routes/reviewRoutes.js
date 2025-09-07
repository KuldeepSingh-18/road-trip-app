// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');
const Trip = require('../models/Trip');
const { protect } = require('../middleware/authMiddleware');

// Create a review (protected)
router.post('/:tripId', protect, async (req, res) => {
  try {
    const { tripId } = req.params;
    const { rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ error: 'Invalid trip id' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const review = new Review({
      user: req.user._id, // 👈 ensure user is stored
      trip: tripId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Get reviews for a trip (public)
router.get('/:tripId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.tripId)) {
      return res.status(400).json({ error: 'Invalid trip id' });
    }

    const reviews = await Review.find({ trip: req.params.tripId })
      .populate('user', 'username email');

    res.json(reviews);
  } catch (err) {
    console.error('❌ Error fetching reviews:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// Delete a review (protected, only review owner can delete)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid review id' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error('❌ Error deleting review:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

module.exports = router;
