const { retornoDb } = require("./fixtures/seeds");
const {
  getProducts,
  getRevenue,
  getAsp,
  getAov
} = require("../src/utils/getParams");

test("Deve retornar soma correta de itens", () => {
  const result = getProducts(retornoDb);
  expect(result).toBe(4);
});

test("Deve retornar a receita total correta", () => {
  const result = getRevenue(retornoDb);
  expect(result).toBe(62);
});

test("Deve retornar o preco medio de venda correto", () => {
  const result = getAsp(retornoDb);
  expect(result).toBe(15.5);
});

test("Deve retornar o preco medio de venda correto", () => {
  const result = getAov(retornoDb);
  expect(result).toBe(31);
});
