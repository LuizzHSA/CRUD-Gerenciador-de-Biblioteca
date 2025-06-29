const db = require('../config/db');

// Criar um novo livro
exports.criarLivro = (req, res) => {
    const { titulo, autor, editora, ano, quantidade } = req.body;

    const query = 'INSERT INTO livros (titulo, autor, editora, ano, quantidade) VALUES (?, ?, ?, ?, ?)';
    const values = [titulo, autor, editora, ano, quantidade];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir livro:', err);
            res.status(500).send('Erro ao inserir livro');
        } else {
            res.status(201).send('Livro inserido com sucesso');
        }
    });
};

// Listar todos os livros
exports.listarLivros = (req, res) => {
    db.query('SELECT * FROM livros', (err, results) => {
        if (err) {
            console.error('Erro ao buscar livros:', err);
            res.status(500).send('Erro ao buscar livros');
        } else {
            res.json(results);
        }
    });
};
