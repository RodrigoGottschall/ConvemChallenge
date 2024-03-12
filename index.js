const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Configurando o Body-Parser
app.use(bodyParser.json());

// Rota POST para transações
app.post("/transactions", (req, res) => {
  const { idempotencyId, amount, type } = req.body;

  // Validação dos dados (opcional)

  // Processamento da transação
  // ...

  // Retorno da resposta
  res.status(201).json({
    success: true,
    message: "Transação processada com sucesso!",
  });
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});
