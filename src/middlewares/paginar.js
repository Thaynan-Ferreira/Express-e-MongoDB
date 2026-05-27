import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js';

async function paginar(req, res, next) {
    try {
        let { limite = 5, pagina = 1, ordenacao = "id:-1" } = req.query; // Obtém os parâmetros de limite e página a partir dos parâmetros de consulta
        
        let [campoOrdenacao, ordem] = ordenacao.split(":"); // Divide o parâmetro de ordenação em campo e ordem
    
        limite = Number(limite); // Converte o limite para um número
        pagina = Number(pagina); // Converte a página para um número
        ordem = Number(ordem); // Converte a ordem para um número
        campoOrdenacao = campoOrdenacao; // Obtém o campo de ordenação

        const resultado = req.resultado; // Obtém o resultado da consulta anterior, que deve ser um array de livros
    
        if (limite <= 0 || pagina <= 0) {
            next( new RequisicaoIncorreta());
        } else {
            const resultadoPaginado = await resultado.find()
                .sort({ [campoOrdenacao]: ordem }) // Ordena os livros pelo campo e ordem especificados
                .skip((pagina - 1) * limite) // Calcula o número de documentos a pular com base na página e no limite
                .limit(Number(limite)) // Limita o número de documentos retornados com base no limite
                .exec();
            res.status(200).json(resultadoPaginado);
    
        }
    } 
    catch (erro) {
        next(erro); // Passa o erro para o middleware de tratamento de erros
    }

}

export default paginar;