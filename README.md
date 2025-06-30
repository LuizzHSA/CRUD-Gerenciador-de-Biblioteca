# 📚 CRUD - Gerenciador de Biblioteca

Este projeto é um sistema simples de **CRUD (Create, Read, Update, Delete)** para gerenciamento de livros em uma biblioteca, usando:

- **Node.js + Express**
- **MySQL**
- **HTML + JavaScript (Fetch API)**
- Sem frameworks no frontend (vanilla JS)

---

## 🚀 Funcionalidades

- ✅ Cadastrar novos livros
- ✅ Listar livros cadastrados (API)
- ⚠️ Atualizar e deletar livros (em construção)
- 📦 API RESTful conectada a banco de dados MySQL

---

## 🧱 Estrutura de Pastas

crud-biblioteca/
├── backend/
│ ├── server.js
│ ├── app.js
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── livroController.js
│ ├── routes/
│ │ └── livroRoutes.js
├── frontend/
│ ├── index.html
│ └── js/
│ └── livros.js



---

## ⚙️ Pré-requisitos

- Node.js instalado
- MySQL rodando (pode usar XAMPP ou WAMP)
- Navegador para abrir o HTML

---

## 🔧 Instalação

### 1. Clone o projeto
git clone https://github.com/seu-usuario/CRUD-Gerenciador-de-Biblioteca.git
cd CRUD-Gerenciador-de-Biblioteca/backend

### 2. Instale as dependências
npm install

### 3. Configure o banco de dados
No MySQL, crie o banco e tabela com:

CREATE DATABASE biblioteca;

USE biblioteca;

CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255),
  autor VARCHAR(255),
  editora VARCHAR(255),
  ano INT,
  quantidade INT
);
### 4. Configure a conexão
Edite o arquivo backend/config/db.js:

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       // coloque sua senha do MySQL aqui
  database: 'biblioteca'
});

### ▶️ Como rodar
1. Backend
bash
Copiar
Editar
node backend/server.js
A API rodará em: http://localhost:3000

### 2. Frontend
Abra frontend/index.html no navegador (duplo clique ou com Live Server).

### 🛠 Endpoints da API
Método	Rota	Descrição
POST	/api/livros	Cadastrar livro
GET	/api/livros	Listar livros
