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
    color: "PRETO",
    order_date: null,
    order_id: 1028407273,
    price: 10.5,
    product_sku: 609127401235,
    quantity: 2,
    SIZE: "35"
  },
  {
    color: "PRETO",
    order_date: null,
    order_id: 1028407274,
    price: 5.0,
    product_sku: 609127401236,
    quantity: 2,
    SIZE: "35"
  }
];

module.exports = { usuario, consulta, retornoDb };
