# API REST com Express e MongoDB 🌐🔋

Este repositório foi desenvolvido com o objetivo de praticar a criação de APIs dinâmicas e escaláveis utilizando o ecossistema **Node.js**. O projeto marca a evolução dos meus estudos em desenvolvimento backend, implementando o gerenciamento de rotas web e a persistência de dados em um banco NoSQL.

## 🚀 Tecnologias e Ferramentas

* **Node.js**: Ambiente de execução para o código Javascript no backend.
* **Express.js**: Framework minimalista e flexível para gerenciamento de rotas, middlewares e requisições HTTP.
* **MongoDB**: Banco de dados orientado a documentos (NoSQL) para armazenamento flexível e performático.
* **Mongoose**: Biblioteca de modelagem de dados (ODM) que simplifica a abertura de conexões e validação de schemas com o MongoDB.

## 🧠 Conceitos Praticados

* **Operações CRUD completas**: Implementação das operações fundamentais de persistência (Create, Read, Update, Delete) mapeadas para os verbos HTTP correspondentes (`POST`, `GET`, `PUT`, `DELETE`).
* **Modelagem de Dados**: Estruturação de schemas com validações de tipos e campos obrigatórios utilizando as facilidades do Mongoose.
* **Gerenciamento de Middlewares**: Manipulação de dados de entrada através de parsers nativos do Express para lidar com corpos de requisição em formato JSON.
* **Conexão com Banco de Dados Assíncrona**: Utilização de Promises e blocos `try/catch` (`async/await`) para gerenciar as conexões de rede e operações do banco sem travar a aplicação.

## 🔧 Como Configurar e Executar o Projeto

### Pré-requisitos
* Ter o **Node.js** instalado localmente.
* Uma instância ativa do **MongoDB** (rodando localmente ou via cluster no MongoDB Atlas).

### Passo a Passo

1. Clone o repositório:
```bash
   git clone [https://github.com/Thaynan-Ferreira/Express-e-MongoDB.git](https://github.com/Thaynan-Ferreira/Express-e-MongoDB.git)
```
2. Acesse a pasta do projeto:
```bash
   cd Express-e-MongoDB
```

3. Instale as dependências necessarias:
```bash
   npm install
```

4. Configure suas varíaveis de ambiente:
```Snippet de código
   DB_CONNECTION_STRING=sua_string_de_conexao_do_mongodb
```

5. Inicie o servidor de desenvolvimento:
```bash
   npm run dev
```
