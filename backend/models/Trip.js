// models/Trip.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = new Schema({
  dayNumber: Number,
  notes: String,
  stops: [{ type: Schema.Types.ObjectId, ref: 'Place' }] // optional Place model
});

const tripSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }, // optional user relation
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  days: [daySchema],
  distanceKm: Number,
  isPublic: { type: Boolean, default: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
