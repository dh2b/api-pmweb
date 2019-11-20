/**
 * @description Funcao para validar body do request de autorizacao
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 * @param {Request} req - Request
 * @returns {Object} mensagem de erro
 */
const validateAuthRequest = req => {
  //Array com erros de validacao do request
  let requestValidation = [];

  if (!req.body.login) {
    requestValidation.push("parametro {login} não informado");
  }

  if (!req.body.password) {
    requestValidation.push("parametro {password} não informado");
  }

  if (requestValidation.length > 0) {
    return {
      code: 412,
      message: requestValidation
    };
  }
};

module.exports = validateAuthRequest;
