// index.js
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./dbConfig'); // Import MongoDB credentials
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require('cors');
// Connect to MongoDB
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(cors())
// Import and use MongoDB routes
const mongoRoutes = require('./mongoRoutes');
app.use('/api', mongoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
