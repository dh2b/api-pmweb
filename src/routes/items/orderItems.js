/**
 * Retorna dados dos itens por parametros de datas
 * @author Darcio Henrique Bier Bertocco
 * @constructs 11/2019
 */

const knex = require("../../db/config");
const {
  getProducts,
  getRevenue,
  getAsp,
  getAov
} = require("../../utils/getParams");
const { validateDateRequest } = require("../../utils/validateDateRequest");

//Tabela order_items
const ORDER_ITEMS = "order_items";

/**
 * Objeto de request
 * @typedef {Object} Request
 * @property {Object} body - corpo do request
 * @property {string} body.dataInicial - data inicio da periodo a ser pesquisado
 * @property {string} body.dataFinal - data final do periodo a ser pesquisado
 */

/**
 * Objeto de retorno da rota
 * @typedef {Object} Response
 * @property {Object} body - corpo da resposta
 * @property {number} body.order
 * @property {number} body.products
 * @property {number} body.revenue
 * @property {number} body.asp
 * @property {number} body.aov
 */

/**
 * Função para pesquisa no banco de dados e envio do response
 * @async
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<Response>} Response
 */
const orderItems = async (req, res) => {
  // Status de erro não localizado
  const notFoundStatus = {
    code: 404,
    message: "Nao foram encontrados registros"
  };

  // Status de erro para problema no servidor
  const internalError = {
    code: 500,
    message: "Parametros inválidos"
  };

  try {
    const errors = validateDateRequest(req);

    if (errors) {
      return res.status(412).send(errors);
    }

    const dataInicial = req.body.dataInicial;
    const dataFinal = req.body.dataFinal;

    const result = await knex(ORDER_ITEMS)
      .select("price", "quantity")
      .whereBetween("order_date", [dataInicial, dataFinal])
      .catch(err => {
        console.log(err);
        throw {
          code: 500,
          message: "Falha na consulta dos dados"
        };
      });

    if (result.length > 0) {
      const orderResult = {
        orders: result.length,
        products: getProducts(result),
        revenue: getRevenue(result),
        asp: getAsp(result),
        aov: getAov(result)
      };

      return res.status(200).send(orderResult);
    } else {
      return res.status(404).send(notFoundStatus);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(internalError);
  }
};

module.exports = { orderItems };
