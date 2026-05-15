import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(error) {
        const mensagensDeErro = Object.values(error.errors)
        .map(erro => erro.message)
        .join("; ");

        super(`Os seguintes erros foram encontrados: ${mensagensDeErro}`); // Define a mensagem de erro personalizada com as mensagens de validação concatenadas
    }
}

export default ErroValidacao;