import mongoose from "mongoose";

//objeto de configuração do modelo de dados, onde definimos os campos e seus tipos
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    editora: { type: String},
    preco: { type: Number },
    paginas: { type: Number }
}, { versionKey: false } // Desativa o campo __v que o Mongoose adiciona por padrão
);

const livro = mongoose.model('livros', livroSchema); // Criação do modelo de dados, onde 'livros' é o nome da coleção no MongoDB

export default livro; // Exportação do modelo para ser utilizado em outras partes da aplicação