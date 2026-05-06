import mongoose, { mongo } from 'mongoose';

async function connectaNaDatabase() {
    mongoose.connect('mongodb://localhost:27017/livraria')

    return mongoose.connection;

}

export default connectaNaDatabase;

