import livro from '../models/livro.js';
import { autor } from '../models/Autor.js';

// Controlador para gerenciar as operações relacionadas aos livros
class LivroController {

    // Método para listar todos os livros
    static listarLivros = async (req, res) => {
        try {
            const listaLivros = await livro.find()
            .populate("autor")
            .exec();
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({ message: `Erro ao listar livros: ${error.message}`, error: error.message });
        }
    }

    // Método para listar um livro específico por ID
     static listarLivroPorId = async (req, res) => {
        try {
            const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
            const livroEncontrado = await livro.findById(id)
            .populate("autor", "nome")
            .exec();
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).json({ message: `Erro ao listar livro: ${error.message}`, error: error.message });
        }
    }


    // Método para cadastrar um novo livro
    static cadastrarLivro = async (req, res) => {
        
        try {
            let livro = new livro(req.body);

            const livroCriado = await livro.save();
            res.status(201).json({ message: 'Livro cadastrado com sucesso!', livro: livroCriado }); // Retorna o livro cadastrado junto com a mensagem de sucesso

        } catch (error) {
            res.status(500).json({ message: `Erro ao cadastrar livro: ${error.message}`, error: error.message });
        }
    }

       static atualizarLivro = async (req, res) => {
        try {
            const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
            await livro.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).json({ message: 'Livro atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `Erro ao atualizar livro: ${error.message}`, error: error.message });
        }
    }

    // Método para deletar um livro
    static deletarLivro = async (req, res) => {
        try {
            const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: 'Livro deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `Erro ao deletar livro: ${error.message}`, error: error.message });
        }
    };

    static listarLivrosPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora; // Obtém o nome da editora a partir dos parâmetros de consulta
            const livrosPorEditora = await livro.find({ editora: editora }); // Busca os livros que correspondem à editora fornecida
            res.status(200).json(livrosPorEditora); // Retorna a lista de livros encontrados
        } catch (error) {
            res.status(500).json({ message: `Erro ao listar livros por editora: ${error.message}`, error: error.message });
        }
    }
};

export default LivroController;
