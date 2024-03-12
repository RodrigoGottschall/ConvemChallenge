const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Usar o body-parser para analisar JSON
app.use(bodyParser.json());

// Definir a rota POST
app.post("/transactions", (req, res) => {
  // Obter o payload da requisição
  const { idempotencyId, amount, type } = req.body;

  // Validar o payload (opcional)

  // Processar a transação
  // ...

  // Retornar uma resposta
  res.status(201).send({ message: "Transação criada com sucesso!" });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor em execução na porta 3000");
});
