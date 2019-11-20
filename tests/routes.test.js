const request = require("supertest");
const { app } = require("../src/server/server");
const { usuario, consulta } = require("./fixtures/seeds");

require("dotenv").config({ encoding: "utf8" });

test("Deve retornar token jwt", async () => {
  const response = await request(app)
    .post("/item/auth")
    .send({
      login: usuario.login,
      password: usuario.password
    })
    .expect(200);

  expect(response.body.token).toBe(usuario.token);
  expect(response.body.message).toBe("Autorizado");
});

test("Deve retornar erro por senha invalida", async () => {
  await request(app)
    .post("/item/auth")
    .send({
      login: usuario.login,
      password: "SenhaErrada"
    })
    .expect(401);
});

test("Deve retornar objeto correto", async () => {
  const response = await request(app)
    .post("/item/orders")
    .set("Authorization", `Bearer ${usuario.token}`)
    .send({
      dataInicial: consulta.dataInicial,
      dataFinal: consulta.dataFinal
    })
    .expect(200);

  expect(response.body.orders).toEqual(expect.any(Number));
});

test("Deve retornar erro por parametros invalidos", async () => {
  const response = await request(app)
    .post("/item/orders")
    .set("Authorization", `Bearer ${usuario.token}`)
    .send({
      dataInicial: "101010101",
      dataFinal: consulta.dataFinal
    })
    .expect(412);

  expect(response.body.code).toBe(412);
  expect(response.body.message[0]).toBe(
    "parametro {dataInicial} não é do formato YYYY-MM-DD"
  );
});
