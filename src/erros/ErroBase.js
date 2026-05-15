class ErroBase extends Error {
    // Construtor da classe ErroBase
    constructor(mensagem = "Erro interno do servidor", status = 500) {
        super();
        this.message = mensagem;
        this.status = status;
    }

    // Método para enviar a resposta de erro
    enviarResposta(res){
        // Envia a resposta de erro com o status e a mensagem definida na instância do erro
        res.status(this.status).send({
        message: this.message,
        status: this.status
        });
    }
}

export default ErroBase;