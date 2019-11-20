/**
 * @description Funcao para validar body do request recebido
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 * @param {Request} req - Request
 * @returns {Object} mensagem de erro
 */

const moment = require("moment");

const validateDateRequest = req => {
  //Array com erros de validacao do request
  let requestValidation = [];

  const { dataInicial, dataFinal } = req.body;

  if (!dataInicial) {
    requestValidation.push("parametro {dataInicial} não informada");
  }

  if (!dataFinal) {
    requestValidation.push("parametro {dataFinal} não informada");
  }

  // Validacoes de formato de data
  const validDataInicial = moment(dataInicial, "YYYY-MM-DD", true);
  const validDataFinal = moment(dataFinal, "YYYY-MM-DD", true);

  if (!validDataInicial.isValid()) {
    requestValidation.push(
      "parametro {dataInicial} não é do formato YYYY-MM-DD"
    );
  }

  if (!validDataFinal.isValid()) {
    requestValidation.push("parametro {dataFinal} não é do formato YYYY-MM-DD");
  }

  if (requestValidation.length > 0) {
    return {
      code: 412,
      message: requestValidation
    };
  }
};

module.exports = { validateDateRequest };
