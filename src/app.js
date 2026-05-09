import express from 'express';
import connectaNaDatabase from './config/dbConnect.js';
import routes from './routes/index.js';

const conexao = await connectaNaDatabase(); // Conexão com o banco de dados
conexao.on('error', (erro) => {
    console.error('Erro de conexão com o banco de dados: ' + erro)
});
conexao.once('open', () => {
    console.log('Conexão com o banco de dados estabelecida!')
});

const app = express(); // Criação da aplicação Express
routes(app); // Configuração das rotas da aplicação



export default app; // Exportação da aplicação para ser utilizada em outros arquivos