const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// POST /api/livros
router.post('/livros', livroController.criarLivro);

// GET /api/livros
router.get('/livros', livroController.listarLivros);

module.exports = router;

