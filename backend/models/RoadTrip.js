const mongoose = require('mongoose');

const RoadTripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  locations: [{ type: String, required: true }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true });

const RoadTrip = mongoose.model('RoadTrip', RoadTripSchema);
module.exports = RoadTrip;
