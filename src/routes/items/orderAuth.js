/**
 * @description Rota para autenticar e gerar tokeJWT
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 */

const generateAuthToken = require("../../utils/generateAuthToken");
const validateAuthRequest = require("../../utils/validateAuthRequest");

/**
 * Objeto de request
 * @typedef {Object} Request
 * @property {Object} body - corpo do request
 * @property {string} body.login - login do usuario
 * @property {string} body.password - senha do usuario
 */

/**
 * Objeto de retorno da rota
 * @typedef {Object} Response
 * @property {Object} body - corpo da resposta
 * @property {string} body.message - mensagem de autorizacao
 * @property {string} body.token - token JWT
 */

/**
 * Função para pesquisa no banco de dados e envio do response
 * @async
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<Response>} Response
 */
const loginAuth = async (req, res) => {
  try {
    const errors = validateAuthRequest(req);

    if (errors) {
      return res.status(412).send(errors);
    }

    const { login, password } = req.body;

    if (password !== process.env.AUTH_PASSWORD) {
      return res.status(401).send({
        code: 401,
        message: "Parâmetro incorreto ou inválido"
      });
    }

    const token = await generateAuthToken(login);

    return res.send({ message: "Autorizado", token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = { loginAuth };
