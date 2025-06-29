const express = require('express');
const cors = require('cors');
const livroRoutes = require('./routes/livroRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Aqui é onde você define o prefixo "/api"
app.use('/api', livroRoutes);

module.exports = app;


