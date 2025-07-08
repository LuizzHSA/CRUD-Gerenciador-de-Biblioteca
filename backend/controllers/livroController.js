exports.criarLivro = (req, res) => {
    const { titulo, autor, editora, ano, quantidade } = req.body;

    const sql = 'INSERT INTO livros (titulo, autor, editora, ano, quantidade) VALUES (?, ?, ?, ?, ?)';
    const values = [titulo, autor, editora, ano, quantidade];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir livro:', err);
            res.status(500).send('Erro ao cadastrar o livro');
        } else {
            res.status(201).send('Livro cadastrado com sucesso!');
        }
    });
};
