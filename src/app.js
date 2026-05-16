import express from 'express';
import connectaNaDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import manipulador404 from './middlewares/manipulador404.js';

const conexao = await connectaNaDatabase(); // Conexão com o banco de dados
conexao.on('error', (erro) => {
    console.error('Erro de conexão com o banco de dados: ' + erro)
});
conexao.once('open', () => {
    console.log('Conexão com o banco de dados estabelecida!')
});

const app = express(); // Criação da aplicação Express
app.use(express.json()); // Middleware para parsear o corpo das requisições como JSON
routes(app); // Configuração das rotas da aplicação

app.use(manipulador404); // Middleware para lidar com rotas não encontradas


app.use(manipuladorDeErros);


export default app; // Exportação da aplicação para ser utilizada em outros arquivos