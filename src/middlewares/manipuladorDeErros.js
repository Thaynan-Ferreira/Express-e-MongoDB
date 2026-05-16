import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

// Middleware para manipulação de erros
function manipuladorDeErros(error, req, res, next) {
    console.error(error);
    if (error instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarResposta(res); // Envia uma resposta de erro para requisição incorreta quando há um erro de conversão de tipo do Mongoose
    }
    // Verifica se o erro é uma validação de dados do Mongoose
    else if (error instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(error).enviarResposta(res); // Envia uma resposta de erro personalizada para erros de validação, utilizando a classe ErroValidacao
        
    }
    else if (error instanceof NaoEncontrado) {
        error.enviarResposta(res);
    }
    else {
        new ErroBase().enviarResposta(res); // Envia uma resposta de erro genérica para outros tipos de erros
    }
}

export default manipuladorDeErros;