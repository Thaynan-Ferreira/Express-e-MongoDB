import mongoose from 'mongoose';
import { autor } from '../models/Autor.js';

// Controlador para gerenciar as operações relacionadas aos autores
class AutorController {

    // Método para listar todos os autores  
    static listarAutores = async (req, res, next) => {
        try {
            const listaAutores = await autor.find();
            res.status(200).json(listaAutores);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para listar um autor específico por ID
      static listarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID do autor a partir dos parâmetros da URL
            const autorEncontrado = await autor.findById(id);

            if (autorEncontrado !== null) {
                res.status(200).send(autorEncontrado);
                
            } else {
                res.status(404).send({ message: `Id do autor não encontrado: ${id}` });
            }
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }


    // Método para cadastrar um novo autor
    static cadastrarAutor = async (req, res, next) => {
        try {
            let novoAutor = new autor(req.body);
            const autorResultado = await novoAutor.save();

            res.status(201).json({ message: 'Autor cadastrado com sucesso!', autor: autorResultado }); // Retorna o autor cadastrado junto com a mensagem de sucesso

        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

       static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID do autor a partir dos parâmetros da URL
            await autor.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).json({ message: 'Autor atualizado com sucesso!' });
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar um autor
    static deletarAutor = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID do autor a partir dos parâmetros da URL
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: 'Autor deletado com sucesso!' });
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export default AutorController;
