const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o MySQL:', err);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
    }
});

module.exports = connection;

