const db = require('../config/db');

const Livro = {
    getAll: (callback) => {
        db.query('SELECT * FROM livros', callback);
    },

    create: (livro, callback) => {
        db.query('INSERT INTO livros SET ?', livro, callback);
    },

    update: (id, livro, callback) => {
        db.query('UPDATE livros SET ? WHERE id = ?', [livro, id], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM livros WHERE id = ?', [id], callback);
    }
};

module.exports = Livro;
