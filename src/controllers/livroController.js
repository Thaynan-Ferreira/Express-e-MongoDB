import { livro, autor } from '../models/index.js';
import NaoEncontrado from '../erros/NaoEncontrado.js';
import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js';

// Controlador para gerenciar as operações relacionadas aos livros
class LivroController {

    // Método para listar todos os livros
    static listarLivros = async (req, res, next) => {
        try {
            let { limite = 2, pagina = 1 } = req.query; // Obtém os parâmetros de limite e página a partir dos parâmetros de consulta

            limite = Number(limite); // Converte o limite para um número
            pagina = Number(pagina); // Converte a página para um número

            if (limite <= 0 || pagina <= 0) {
                next( new RequisicaoIncorreta());
            } else {
                const listaLivros = await livro.find()
                    .skip((pagina - 1) * limite) // Calcula o número de documentos a pular com base na página e no limite
                    .limit(Number(limite)) // Limita o número de documentos retornados com base no limite
                    .populate("autor")
                    .exec();
                res.status(200).json(listaLivros);

            }

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
            const busca = await processaFiltros(req.query);

            if (busca !== null) {
                const livrosPorEditora = await livro
                    .find(busca) // Busca os livros que correspondem aos critérios de busca
                    .populate("autor", "nome") // Popula o campo de autor com o nome do autor
        
                res.status(200).json(livrosPorEditora); // Retorna a lista de livros encontrados
            } else {
                res.status(200).send([]); // Retorna uma lista vazia caso nenhum livro corresponda aos critérios de busca
            }
        }catch (error) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

};

async function processaFiltros(query) {

    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = query; // Obtém o nome da editora a partir dos parâmetros de consulta

    let busca = {};

    if (editora) busca.editora = { $regex: editora, $options: 'i' }; // Adiciona o filtro de editora à busca se for fornecido
    if (titulo) busca.titulo = { $regex: titulo, $options: 'i' }; // Adiciona o filtro de título à busca se for fornecido

    if (minPaginas || maxPaginas) busca.paginas = {}; // Inicializa o filtro de páginas se pelo menos um dos filtros de páginas for fornecido
    if (minPaginas) busca.paginas.$gte = minPaginas; // Adiciona o filtro de mínimo de páginas à busca se for fornecido
    if (maxPaginas) busca.paginas.$lte = maxPaginas; // Adiciona o filtro de máximo de páginas à busca se for fornecido

    if (nomeAutor) {
        const autores = await autor.findOne({ nome: nomeAutor }); // Busca o autor pelo nome fornecido

        if (autores !== null) {
            busca.autor = autores._id; // Adiciona o filtro de autor à busca usando o ID do autor
        } else {
            busca = null; // Define o filtro de autor como null para garantir que nenhum livro seja retornado se o autor não for encontrado
        }
        
    }

    return busca; // Retorna o objeto de busca com os filtros aplicados    
}

export default LivroController;
