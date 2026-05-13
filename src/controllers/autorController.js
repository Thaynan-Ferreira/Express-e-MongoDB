import mongoose from 'mongoose';
import { autor } from '../models/Autor.js';

// Controlador para gerenciar as operações relacionadas aos autores
class AutorController {

    // Método para listar todos os autores  
    static listarAutores = async (req, res) => {
        try {
            const listaAutores = await autor.find();
            res.status(200).json(listaAutores);
        } catch (error) {
            res.status(500).json({ message: `Erro ao listar autores: ${error.message}`, error: error.message });
        }
    }

    // Método para listar um autor específico por ID
      static listarAutorPorId = async (req, res) => {
        try {
            const id = req.params.id; // Obtém o ID do autor a partir dos parâmetros da URL
            const autorEncontrado = await autor.findById(id);

            if (autorEncontrado !== null) {
                res.status(200).send(autorEncontrado);
                
            } else {
                res.status(404).send({ message: `Id do autor não encontrado: ${id}` });
            }
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                res.status(400).send({ message: "Id do autor inválido"});
            }
            else {
                res.status(500).send({ message: "Erro interno de servidor" });
            }
        }
    }


    // Método para cadastrar um novo autor
    static cadastrarAutor = async (req, res) => {
        try {
            let autor = new autores(req.body);
            const autorResultado = await autor.save();

            res.status(201).json({ message: 'Autor cadastrado com sucesso!', autor: autorResultado }); // Retorna o autor cadastrado junto com a mensagem de sucesso

        } catch (error) {
            res.status(500).json({ message: `Erro ao cadastrar autor: ${error.message}`, error: error.message });
        }
    }

       static atualizarAutor = async (req, res) => {
        try {
            const id = req.params.id; // Obtém o ID do autor a partir dos parâmetros da URL
            await autor.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).json({ message: 'Autor atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `Erro ao atualizar autor: ${error.message}`, error: error.message });
        }
    }

    // Método para deletar um autor
    static deletarAutor = async (req, res) => {
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
