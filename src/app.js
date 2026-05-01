import express from 'express';

const app = express(); // Criação da aplicação Express

// Rota para a página inicial
app.get('/', (req, res) => {
    res.status(200).send('Bem-vindo à página inicial!');
})

export default app; // Exportação da aplicação para ser utilizada em outros arquivos