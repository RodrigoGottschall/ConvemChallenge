const express = require("express");
const router = require("./routes/index");
const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Rotas da API
app.use("/api", router);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
