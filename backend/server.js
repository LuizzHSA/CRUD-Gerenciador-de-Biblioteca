const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Caminho para o JSON
const DB_PATH = path.join(__dirname, 'livros.json');

// Middleware para JSON e arquivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota para página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Rota para livros.html
app.get('/livros.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/livros.html'));
});

// GET - listar todos os livros
app.get('/api/livros', (req, res) => {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const livros = JSON.parse(data);
    res.json(livros);
});

// POST - adicionar novo livro
app.post('/api/livros', (req, res) => {
    const { titulo, autor } = req.body;
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const livros = JSON.parse(data);
    const novoLivro = { id: Date.now(), titulo, autor };
    livros.push(novoLivro);
    fs.writeFileSync(DB_PATH, JSON.stringify(livros, null, 2));
    res.status(201).json(novoLivro);
});

// DELETE - remover livro por ID
app.delete('/api/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let livros = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    const livrosFiltrados = livros.filter(livro => livro.id !== id);
    fs.writeFileSync(DB_PATH, JSON.stringify(livrosFiltrados, null, 2));
    res.status(200).json({ mensagem: 'Livro removido com sucesso!' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
