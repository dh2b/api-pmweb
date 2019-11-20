# pmweb-test

## Introdução

Serviço REST atendento os requisitos do teste técnido para a empresa pmweb;

| Rotas               | Descrição                                                      | Método |
| ------------------- | -------------------------------------------------------------- | ------ |
| `<url>/item/auth`   | Rota para autenticar usuários, retornando token para navegação | POST   |
| `<url>/item/orders` | Rota que retorna objeto com dados sobre pedidos efetuados      | POST   |

### **Variáveis de ambiente**

Para o funcionamento do serviço, é necessário a inclusão de um arquivo **.env** no diretório raiz do programa, contendo as seguinte variáveis:

| Variável    | Descrição                                          |
| ----------- | -------------------------------------------------- |
| PORT        | Porta que será usada pela aplicação                |
| DB_HOST     | Hostname para conexão com o banco de dados         |
| DB_NAME     | Nome do banco de dados que será acessado           |
| DB_USER     | Username para acesso ao banco de dados             |
| DB_PASSWORD | Senha para acesso ao banco de dados                |
| JWT_KEY     | Chave que será usavada para criação dos tokens JWT |
| JWT_TIME    | Tempo de expiração dos tokens JWT                  |

Dentro do código há o arquivo **.env.default** que serve de referência de localização e variáveis que deverão conter dentro do arquivo **.env** que deverá ser criado.

### **Scripts do Serviço**

| Funcionalidade                    | Script              |
| --------------------------------- | ------------------- |
| Inicializar o serviço             | npm start           |
| Inicializar o serviço com Nodemon | npn run start-watch |
| Executar testes unitários         | npm test            |

### **Códigos de Retorno**

| Número | Descrição           | Obs                                  |
| ------ | ------------------- | ------------------------------------ |
| 200    | OK                  | Em caso de sucesso de um request     |
| 401    | Unauthorized        | Em caso de problemas na autenticação |
| 404    | Not Found           | Dados não encontrados                |
| 412    | Precondition Failed | Dados faltantes para fazer a request |

## Autenticação

---

Caminho: `<url>/item/auth`

Método: **POST**

Retorna dados para navegação (token JWT).

### **Request**

_Request body_

```json
{
  "login": "Usuario",
  "password": "Senha"
}
```

| Parâmetro | Tipo   | Descrição        |
| --------- | ------ | ---------------- |
| login     | String | Login do usuario |
| password  | String | Senha do usuario |

### **Response**

```json
{
  "message": "Autorizado",
  "token": "eyJhbGciOi..."
}
```

| Parâmetro | Tipo   | Descrição                               |
| --------- | ------ | --------------------------------------- |
| message   | String | Mensagem com confirmação de autorização |
| token     | String | token JWT para autorização              |

## Consulta dados pedidos

---

Retorna dados dos pedidos de acordo com as datas informadas

Caminho: `<url>/item/orders`

Método: **POST**

### **Request**

_Headers_

| Key           | Value             | Descrição                 |
|---------------|-------------------|---------------------------|
| Authorization | Bearer {tokenJWT} | Autenticação para request |

_Request body_

```json
{
  "dataInicial": "2014-11-10",
  "dataFinal": "2014-11-30"
}
```

| Parâmetro   | Tipo   | Formato    | Descrição               |
| ----------- | ------ | ---------- | ----------------------- |
| dataInicial | String | YYYY-MM-DD | Data inicial do periodo |
| dataFinal   | String | YYYY-MM-DD | Data final do periodo   |

### **Response**

```json
{
  "orders": 13,
  "products": 23,
  "revenue": 23917.01,
  "asp": 1039.87,
  "aov": 1839.77
}
```

| Parâmetro | Tipo   | Descrição                                 |
| --------- | ------ | ----------------------------------------- |
| orders    | Number | Número total de pedidos                   |
| products  | Number | Soma das quantidades de produtos vendidos |
| revenue   | Number | Soma da receita total                     |
| asp       | Number | Preço médio de venda                      |
| aov       | Number | Ticket médio de venda                     |
