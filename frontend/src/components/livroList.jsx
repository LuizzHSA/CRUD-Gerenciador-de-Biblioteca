import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LivroList() {
    const [livros, setLivros] = useState([]);

    const carregarLivros = async () => {
        const resposta = await axios.get('http://localhost:3000/api/livros');
        setLivros(resposta.data);
    };

    const deletarLivro = async (id) => {
        if (!window.confirm('Confirmar exclusão?')) return;
        await axios.delete(`http://localhost:3000/api/livros/${id}`);
        carregarLivros();
    };

    useEffect(() => {
        carregarLivros();
    }, []);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th><th>Título</th><th>Autor</th><th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {livros.map((livro) => (
                    <tr key={livro.id}>
                        <td>{livro.id}</td>
                        <td>{livro.titulo}</td>
                        <td>{livro.autor}</td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => deletarLivro(livro.id)}>Deletar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
