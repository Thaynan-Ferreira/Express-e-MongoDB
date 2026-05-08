import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

// Rota para listar todos os livros
routes.get('/livros', LivroController.listarLivros);

export default routes;