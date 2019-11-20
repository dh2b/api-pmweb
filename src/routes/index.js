/**
 * Indice geral das rotas do express
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 */

const router = require("express").Router();
const cors = require("cors");
const items = require("./items");

//operacoes referente a rota de order items
router.use("/item", cors(), items);

//rota para status da aplicacao
router.get("/", (req, res) => {
  res.send({ status: "Conectado ao Server", version });
});

module.exports = router;
