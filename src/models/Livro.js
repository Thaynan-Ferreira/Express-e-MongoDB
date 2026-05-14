import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

//objeto de configuração do modelo de dados, onde definimos os campos e seus tipos
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
        type: String,
        required: [ true, "O título do livro é obrigatório" ] },
    editora: { type: String},
    preco: { type: Number },
    paginas: { type: Number },
    autor: autorSchema // Campo de referência para o autor, utilizando o schema do autor para garantir a estrutura correta dos dados relacionados ao autor do livro
}, { versionKey: false } // Desativa o campo __v que o Mongoose adiciona por padrão
);

const livro = mongoose.model('livros', livroSchema); // Criação do modelo de dados, onde 'livros' é o nome da coleção no MongoDB

export default livro; // Exportação do modelo para ser utilizado em outras partes da aplicação