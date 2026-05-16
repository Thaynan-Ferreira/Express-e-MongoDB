import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipulador404(req, res, next) {
    const erro404 = new NaoEncontrado(); // Cria uma instância do erro de "Não Encontrado"
    next(erro404); // Passa o erro para o próximo middleware, que é o manipulador de erros
}

export default manipulador404;