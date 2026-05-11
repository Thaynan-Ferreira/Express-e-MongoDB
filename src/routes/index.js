import express from 'express';
import livros from '../routes/livrosRoutes.js';
import autores from '../routes/autoresRoutes.js';

// Função de configuração das rotas

const routes = (app) => {
    // Rota para a página inicial
    app.route('/').get((req, res) => {
        res.status(200).send('Bem-vindo à página inicial!');
    });

    // Rota para listar todos os livros
    app.use(
        express.json(),
        livros,
        autores
    );
};

export default routes;