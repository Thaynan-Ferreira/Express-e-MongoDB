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

// Rota para obter um livro específico
app.get('/livros/:id', (req, res) => {
    const livroIndex = getLivroById(req.params.id);

    // Verifica se o livro existe antes de tentar retornar-lo
    if (livroIndex !== -1) {
        res.status(200).json(livros[livroIndex]);
    } else {
        res.status(404).send('Livro não encontrado!');
    }
})

// Rota para adicionar um novo livro
app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro adicionado com sucesso!');
});

// Rota para atualizar um livro existente
app.put('/livros/:id', (req, res) => {
    const livroIndex = getLivroById(req.params.id);

        // Verifica se o livro existe antes de tentar atualizar-lo
        if (livroIndex !== -1) {
        livros[livroIndex].titulo = req.body.titulo;
        livros[livroIndex].autor = req.body.autor;
        res.status(200).json(livros);
    } else {
        res.status(404).send('Livro não encontrado!');
    }
});

// Rota para deletar um livro
app.delete('/livros/:id', (req, res) => {
    const livroIndex = getLivroById(req.params.id);

    // Verifica se o livro existe antes de tentar deletar-lo
    if (livroIndex !== -1) {
        livros.splice(livroIndex, 1); // Remove o livro do array
        res.status(200).send('Livro deletado com sucesso!');
    } else {
        res.status(404).send('Livro não encontrado!');
    }
});

export default app; // Exportação da aplicação para ser utilizada em outros arquivos