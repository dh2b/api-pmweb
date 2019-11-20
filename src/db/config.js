/**
 * Configuracoes para conexao com banco de dados
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 */
module.exports = knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});
