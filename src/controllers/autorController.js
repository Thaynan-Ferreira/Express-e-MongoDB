import autor from '../models/livro.js';

// Controlador para gerenciar as operações relacionadas aos autores
class AutorController {

    // Método para listar todos os autores  
    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (error) {
            res.status(500).json({ message: `Erro ao listar autores: ${error.message}`, error: error.message });
        }
    }

    // Método para listar um autor específico por ID
     static async listarAutorPorId(req, res) {
        try {
            const id = req.params.id; // Obtém o ID do autor a partir dos parâmetros da URL
            const autorEncontrado = await livro.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (error) {
            res.status(500).json({ message: `Erro ao listar autor: ${error.message}`, error: error.message });
        }
    }


    // Método para cadastrar um novo autor
    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: 'Autor cadastrado com sucesso!', autor: novoAutor }); // Retorna o autor cadastrado junto com a mensagem de sucesso

        } catch (error) {
            res.status(500).json({ message: `Erro ao cadastrar autor: ${error.message}`, error: error.message });
        }
    }

       static async atualizarAutor(req, res) {
        try {
            const id = req.params.id; // Obtém o ID do autor a partir dos parâmetros da URL
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Autor atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `Erro ao atualizar autor: ${error.message}`, error: error.message });
        }
    }

    // Método para deletar um autor
    static async deletarAutor(req, res) {
        try {
            const id = req.params.id; // Obtém o ID do autor a partir dos parâmetros da URL
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: 'Autor deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `Erro ao deletar autor: ${error.message}`, error: error.message });
        }
    }
}

export default AutorController;
