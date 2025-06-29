document.getElementById('formLivro').addEventListener('submit', async function (e) {
    e.preventDefault();

    const livro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        editora: document.getElementById('editora').value,
        ano: parseInt(document.getElementById('ano').value),
        quantidade: parseInt(document.getElementById('quantidade').value),
    };

    try {
        const resposta = await fetch('http://localhost:3000/api/livros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro),
        });

        if (resposta.ok) {
            document.getElementById('mensagem').textContent = 'Livro cadastrado com sucesso!';
            document.getElementById('formLivro').reset();
        } else {
            const erro = await resposta.text();
            document.getElementById('mensagem').textContent = 'Erro: ' + erro;
        }
    } catch (erro) {
        document.getElementById('mensagem').textContent = 'Erro de conexão com o servidor.';
    }
});
