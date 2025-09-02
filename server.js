const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Road Trip App API'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));