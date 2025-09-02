const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//wire routes
const tripRoutes = require('./routes/trips');
app.use('/api/trips', tripRoutes);


// Routes
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
 
app.get('/', (req, res) => res.send('Backend is running'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
