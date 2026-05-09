import livro from '../models/livro.js';

// Controlador para gerenciar as operações relacionadas aos livros
class LivroController {

    // Método para listar todos os livros
    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({ message: `Erro ao listar livros: ${error.message}`, error: error.message });
        }
    }

    // Método para listar um livro específico por ID
     static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).json({ message: `Erro ao listar livro: ${error.message}`, error: error.message });
        }
    }


    // Método para cadastrar um novo livro
    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: 'Livro cadastrado com sucesso!', livro: novoLivro }); // Retorna o livro cadastrado junto com a mensagem de sucesso

        } catch (error) {
            res.status(500).json({ message: `Erro ao cadastrar livro: ${error.message}`, error: error.message });
        }
    }

       static async atualizarLivro(req, res) {
        try {
            const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Livro atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `Erro ao atualizar livro: ${error.message}`, error: error.message });
        }
    }

    // Método para deletar um livro
    static async deletarLivro(req, res) {
        try {
            const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: 'Livro deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `Erro ao deletar livro: ${error.message}`, error: error.message });
        }
    }
}

export default LivroController;
