import http from "http";

const PORT = 3000; // Porta onde o servidor irá escutar as requisições

const rotas = {
    "/": "Bem-vindo à página inicial!",
    "/livros": "Entrei na rota Livros.",
    "/autores": "Entre na rota Autores!"
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end(rotas[req.url] || "Página não encontrada!")
});

server.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}!`)
});

