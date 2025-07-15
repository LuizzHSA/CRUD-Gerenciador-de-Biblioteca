const express = require('express');
const cors = require('cors');
const livroRoutes = require('./routes/livroRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', livroRoutes);

module.exports = app;


