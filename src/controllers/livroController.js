import livro from '../models/livro.js';

// Controlador para gerenciar as operações relacionadas aos livros
class LivroController {
    // Método para listar todos os livros
    static async listarLivros(req, res) {
        const listaLivros = await Livro.find({});
        res.status(200).json(listaLivros);
    }
}

export default LivroController;
