import { livro } from '../models/index.js';
import { autor } from '../models/Autor.js';
import NaoEncontrado from '../erros/NaoEncontrado.js';

// Controlador para gerenciar as operações relacionadas aos livros
class LivroController {

    // Método para listar todos os livros
    static listarLivros = async (req, res, next) => {
        try {
            const listaLivros = await livro.find()
            .populate("autor")
            .exec();
            res.status(200).json(listaLivros);
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para listar um livro específico por ID
     static listarLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
            const livroEncontrado = await livro.findById(id)
            .populate("autor", "nome")
            .exec();
            if (livroEncontrado !== null) {
                res.status(200).send(livroEncontrado);
                            
            } else {
                next(new NaoEncontrado(`Id do livro não encontrado: ${id}`)); // Passa um erro de "Não Encontrado" para o middleware de tratamento de erros caso o livro não seja encontrado
            }
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }


    // Método para cadastrar um novo livro
    static cadastrarLivro = async (req, res, next) => {
        
        try {
            let novoLivro = new livro(req.body);

            const livroCriado = await novoLivro.save();
            res.status(201).json({ message: 'Livro cadastrado com sucesso!', livro: livroCriado }); // Retorna o livro cadastrado junto com a mensagem de sucesso

        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

       static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
            const livroAtualizado = await livro.findByIdAndUpdate(id, {$set: req.body});
            if (livroAtualizado !== null) {
                res.status(200).send(livroAtualizado);
                            
            } else {
                next(new NaoEncontrado(`Id do livro não encontrado: ${id}`)); // Passa um erro de "Não Encontrado" para o middleware de tratamento de erros caso o livro não seja encontrado
            }
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // Método para deletar um livro
    static deletarLivro = async (req, res, next) => {
        try {
            const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
            const livroDeletado = await livro.findByIdAndDelete(id);
            if (livroDeletado !== null) {
                res.status(200).json({ message: 'Livro deletado com sucesso!' });
            } else {
                next(new NaoEncontrado(`Id do livro não encontrado: ${id}`)); // Passa um erro de "Não Encontrado" para o middleware de tratamento de erros caso o livro não seja encontrado
            }
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    };

    static listarLivrosPorFiltro = async (req, res, next) => {
        try {
          const busca = processaFiltros(req.query);

          const livrosPorEditora = await livro.find(busca); // Busca os livros que correspondem aos critérios de busca

            res.status(200).json(livrosPorEditora); // Retorna a lista de livros encontrados
        } catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

};

function processaFiltros(query) {

    const { editora, titulo, minPaginas, maxPaginas } = query; // Obtém o nome da editora a partir dos parâmetros de consulta


    const busca = {};

    if (editora) busca.editora = { $regex: editora, $options: 'i' }; // Adiciona o filtro de editora à busca se for fornecido
    if (titulo) busca.titulo = { $regex: titulo, $options: 'i' }; // Adiciona o filtro de título à busca se for fornecido

    if (minPaginas || maxPaginas) busca.paginas = {}; // Inicializa o filtro de páginas se pelo menos um dos filtros de páginas for fornecido
    if (minPaginas) busca.paginas.$gte = minPaginas; // Adiciona o filtro de mínimo de páginas à busca se for fornecido
    if (maxPaginas) busca.paginas.$lte = maxPaginas; // Adiciona o filtro de máximo de páginas à busca se for fornecido

    return busca; // Retorna o objeto de busca com os filtros aplicados    
}

export default LivroController;
