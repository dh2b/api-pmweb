const jwt = require("jsonwebtoken");

const usuario = {
  login: "UsuarioTeste",
  password: process.env.AUTH_PASSWORD,
  token: jwt.sign({ info: "UsuarioTeste" }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_TIME
  })
};

const consulta = {
  dataInicial: "2014-11-10",
  dataFinal: "2014-11-11"
};

const retornoDb = [
  {
    price: 10.5,
    quantity: 2
  },
  {
    price: 5.0,
    quantity: 2
  }
];

module.exports = { usuario, consulta, retornoDb };
