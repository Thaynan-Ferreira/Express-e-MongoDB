import mongoose from "mongoose";

//objeto de configuração do modelo de dados, onde definimos os campos e seus tipos
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
        type: String,
        required: [ true, "O título do livro é obrigatório" ] },
    editora: {
        type: String,
        // Restringe os valores possíveis para o campo editora
        enum: {
            values: [ "Casa do Código", "Alura", "Novatec", "Outras" ],
            message: "Editora {VALUE} inválida"
        }, 
    },
    preco: { type: Number },
    paginas: {
        type: Number,
        min: [ 1, "O número de páginas deve ser maior que zero. Valor fornecido {VALUE}" ], // Define o valor mínimo permitido para o campo paginas
        max: [ 10000, "O número de páginas deve ser menor que 10.000. Valor fornecido {VALUE}" ] // Define o valor máximo permitido para o campo paginas
    },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'autores' } // Campo de referência para o autor, armazena apenas o ID do documento na coleção 'autores'
}, { versionKey: false } // Desativa o campo __v que o Mongoose adiciona por padrão
);

const livro = mongoose.model('livros', livroSchema); // Criação do modelo de dados, onde 'livros' é o nome da coleção no MongoDB

export default livro; // Exportação do modelo para ser utilizado em outras partes da aplicação