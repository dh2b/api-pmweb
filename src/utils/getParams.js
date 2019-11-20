/**
 * @description Funcao para somar a quantidade de ítens
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 * @param {Array} resultado - resultado da pesquisa no banco de dados
 * @returns {number} quantidade de itens
 */
const getProducts = resultado => {
  let quantityArray = [];
  resultado.forEach(element => {
    quantityArray.push(element.quantity);
  });

  const quantitySum = quantityArray.reduce((a, b) => a + b, 0);

  return quantitySum;
};

/**
 * @description Funcao para somar a receita total
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 * @param {Array} resultado - resultado da pesquisa no banco de dados
 * @returns {number} receita total
 */
const getRevenue = resultado => {
  let priceArray = [];
  let quantityArray = [];

  resultado.forEach(element => {
    priceArray.push(element.price);
    quantityArray.push(element.quantity);
  });

  const quantitySum = quantityArray.reduce((a, b) => a + b, 0);
  const priceSum = priceArray.reduce((a, b) => a + b, 0);

  const revenue = quantitySum * priceSum;

  return Number(revenue.toFixed(2));
};

/**
 * @description Funcao para calcular o preço médio de venda
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 * @param {Array} resultado - resultado da pesquisa no banco de dados
 * @returns {number} preço médio de venda
 */
const getAsp = resultado => {
  let quantity = getProducts(resultado);
  let revenue = getRevenue(resultado);

  const asp = revenue / quantity;

  return Number(asp.toFixed(2));
};

/**
 * @description Funcao para calcular ticket médio de venda
 * @author Darcio Henrique Bier Bertocco
 * @copyright 11/2019
 * @param {Array} resultado - resultado da pesquisa no banco de dados
 * @returns {number} ticket médio de venda
 */
const getAov = resultado => {
  const revenue = getRevenue(resultado);
  const quantity = resultado.length;

  const aov = revenue / quantity;

  return Number(aov.toFixed(2));
};

module.exports = { getProducts, getRevenue, getAsp, getAov };
