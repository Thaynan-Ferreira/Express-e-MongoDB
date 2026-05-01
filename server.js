import app from "./src/app.js"; // Importação da aplicação Express

const PORT = 3000; // Porta onde o servidor irá escutar as requisições

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}!`)
});

