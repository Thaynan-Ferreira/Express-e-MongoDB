import mongoose from 'mongoose';

// Validação global para campos do tipo String, garantindo que não sejam vazios
mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor.trim() !== "",
    message: "O campo '{PATH}' é obrigatório" // Define a mensagem de erro personalizada para campos do tipo String que não podem ser vazios
})