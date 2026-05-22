import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: {
        type: String,
        required: [ true, "O nome do(a) autor(a) é obrigatório" ] 
    },
    nacionalidade: { type: String }
} , { versionKey: false }); // Desativa o campo __v que o Mongoose adiciona por padrão;

const autor = mongoose.model('autores', autorSchema); // Criação do modelo de dados, onde 'autores' é o nome da coleção no MongoDB

export { autor, autorSchema }; // Exporta o modelo e o schema para serem utilizados em outros arquivos