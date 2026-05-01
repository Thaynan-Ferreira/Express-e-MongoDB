import express from 'express';

const app = express(); // Criação da aplicação Express

//array de objetos de livros para simular um banco de dados
const livros = [
    { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien' },
    { id: 2, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling' },
    { id: 3, titulo: 'O Código Da Vinci', autor: 'Dan Brown' }
];

// Rota para a página inicial
app.get('/', (req, res) => {
    res.status(200).send('Bem-vindo à página inicial!');
});

// Rota para listar todos os livros
app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

export default app; // Exportação da aplicação para ser utilizada em outros arquivos