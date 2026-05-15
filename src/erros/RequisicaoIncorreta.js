import ErroBase from "./ErroBase.js";

// Classe de erro para uma requisição incorreta
class RequisicaoIncorreta extends ErroBase {
    constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
        super(mensagem, 400); // Define a mensagem de erro e o status HTTP para requisição incorreta
    }
}

export default RequisicaoIncorreta;