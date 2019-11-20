/**
 * Middleware para verificação do token JWT
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 */
const jwt = require("jsonwebtoken");

/**
 * Funcao para verificar existencia de header e validar token JWT
 * @param {Request} req - request
 * @param {Response} res - response
 * @param {*} next - acesso autorizado
 */
const auth = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(412).send({
        status: {
          code: 412,
          message: "Header authorization nao informado"
        }
      });
    }

    const token = req.header("Authorization").replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_KEY);
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).send({
      code: 401,
      message: error.message
    });
  }
};

module.exports = auth;
