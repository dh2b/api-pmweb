/**
 * Arquivo para criacao e configuracao do express
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 */

const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const router = require("../routes");

//carregando variaveis de ambiente por .env
require("dotenv").config({ encoding: "utf8" });

//carregando o express
const app = express();

//protecao contra determinados HTTP headers
app.use(helmet());

//compressao das rotas HTTP
app.use(compression());

//registrando parser de JSON
app.use(bodyParser.json());

//registrando rotas
app.use("/", router);

//Para prevenir erros nos testes
if (!module.parent) {
  app.listen(process.env.PORT, (req, res) => {
    console.log("Server ativo na porta:", process.env.PORT);
  });
}

module.exports = { app };
