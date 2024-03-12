// Importar dependências
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const SQS = new AWS.SQS();

// Configurar credenciais da AWS
const config = require("./config.json");
AWS.config.update(config);

// Middleware para JSON
app.use(bodyParser.json());

// Obter URL da fila SQS
const queueUrl = "https://sqs.sa-east-1.amazonaws.com/211125635976/convemQueue";

// Rotas da API
app.post("/transactions", (req, res) => {
  const { idempotencyId, amount, type } = req.body;

  // Validar dados (opcional)

  const messageBody = JSON.stringify({
    idempotencyId,
    amount,
    type,
  });

  const params = {
    QueueUrl: queueUrl,
    MessageBody: messageBody,
  };

  // Enviar mensagem para a fila SQS
  SQS.sendMessage(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Erro ao enviar mensagem para SQS" });
      return;
    }

    res.status(201).send({ message: "Transação criada com sucesso!" });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
