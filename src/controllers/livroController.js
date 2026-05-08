import livro from '../models/livro.js';

// Controlador para gerenciar as operações relacionadas aos livros
class LivroController {
    // Método para listar todos os livros
    static async listarLivros(req, res) {
        const listaLivros = await livro.find({});
        res.status(200).json(listaLivros);
    }

    // Método para cadastrar um novo livro
    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await Livro.create(req.body);
            res.status(201).json({ message: 'Livro cadastrado com sucesso!', livro: novoLivro }); // Retorna o livro cadastrado junto com a mensagem de sucesso

        } catch (error) {
            res.status(500).json({ message: `Erro ao cadastrar livro: ${error.message}`, error: error.message });
        }
    }
}

export default LivroController;
