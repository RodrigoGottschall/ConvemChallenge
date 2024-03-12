// routes/index.js

const express = require("express");
const router = express.Router();

// Rotas da API

router.post("/transactions", (req, res) => {
  const { idempotencyId, amount, type } = req.body;

  // Validar dados (opcional)

  // Salvar transação no banco de dados (substitua por sua implementação)

  res.status(201).send({ message: "Transação criada com sucesso!" });
});

module.exports = router;
