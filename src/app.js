import express from 'express';

const app = express(); // Criação da aplicação Express
app.use(express.json()); // Middleware para parsear JSON no corpo das requisições

//array de objetos de livros para simular um banco de dados
const livros = [
    { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien' },
    { id: 2, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling' },
    { id: 3, titulo: 'O Código Da Vinci', autor: 'Dan Brown' }
];

function getLivroById(id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    })
}

// Rota para a página inicial
app.get('/', (req, res) => {
    res.status(200).send('Bem-vindo à página inicial!');
});

// Rota para listar todos os livros
app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

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