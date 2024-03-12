// app.js

const express = require("express");
const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Rotas
app.use("/api", require("./routes/index"));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
