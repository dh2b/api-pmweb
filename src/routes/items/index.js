/**
 * Indice para rotas de servicos referentes a Items
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 */

const router = require("express").Router();

const { orderItems } = require("./orderItems");
const { loginAuth } = require("./orderAuth");
const auth = require("../../middleware/auth");

/**
 * Rota utilizada para retorno de order items
 */
router.post("/orders", auth, orderItems);

/**
 * Rota para autenticacao e criacao token JWT
 */
router.post("/auth", loginAuth);
/**
 * Rota para verificar status do endpoint /item
 */
router.get("/status", (req, res) => {
  res.send({ status: "OK" });
});

module.exports = router;
