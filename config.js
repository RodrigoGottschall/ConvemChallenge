const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.post("/transacoes", (req, res) => {
  const { idempotencyId, amount, type } = req.body;

  // Validação de dados (opcional)

  // Salvar a transação no banco de dados (substitua por sua lógica)

  res.status(201).json({ message: "Transação criada com sucesso!" });
});
