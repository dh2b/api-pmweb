const jwt = require("jsonwebtoken");
require("dotenv").config({ encoding: "utf8" });

/**
 * @description Funcao para gerar token JWT
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 * @param {string} info - informacao para gerar o token
 * @returns {string} token JWT
 */
const generateAuthToken = info => {
  try {
    const token = jwt.sign({ info }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_TIME
    });
    return token;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = generateAuthToken;
