import mongoose from "mongoose";

// Middleware para manipulação de erros
function manipuladorDeErros(error, req, res, next) {
    console.error(error);
    if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Id do autor inválido"});
    }
    // Verifica se o erro é uma validação de dados do Mongoose
    else if (error instanceof mongoose.Error.ValidationError) {
        // Extrai as mensagens de erro de validação e as envia na resposta
        const mensagensDeErro = Object.values(error.errors)
        .map(erro => erro.message)
        .join("; ");
        res.status(400).send({ message: `Os seguintes erros foram encontrados: ${mensagensDeErro}` });
    }
    else {
        res.status(500).send({ message: "Erro interno de servidor" });
    }
}

export default manipuladorDeErros;