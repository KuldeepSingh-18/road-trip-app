const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Wire Routes
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/reviews', reviewRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Start Server + Mongo Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
