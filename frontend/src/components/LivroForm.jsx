import { useState } from 'react';
import axios from 'axios';

export default function LivroForm() {
    const [form, setForm] = useState({
        titulo: '', autor: '', editora: '', ano: '', quantidade: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/livros', form);
            alert('Livro cadastrado com sucesso!');
            setForm({ titulo: '', autor: '', editora: '', ano: '', quantidade: '' });
        } catch (err) {
            alert('Erro ao cadastrar livro.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {['titulo', 'autor', 'editora', 'ano', 'quantidade'].map((field) => (
                <div className="mb-3" key={field}>
                    <input
                        id={field}
                        className="form-control"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={handleChange}
                        required={field === 'titulo' || field === 'autor'}
                    />
                </div>
            ))}
            <button type="submit" className="btn btn-success">Salvar</button>
        </form>
    );
}
