const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

const app = express();

app.use(bodyParser.json());

// Configure suas credenciais AWS
AWS.config.update({
  accessKeyId: "SUA_ACCESS_KEY_ID",
  secretAccessKey: "SUA_SECRET_ACCESS_KEY",
  region: "SUA_REGIÃO", // ex: us-east-1
});

const sqs = new AWS.SQS();

app.post("/transactions", (req, res) => {
  const { idempotencyId, amount, type } = req.body;

  // Validar o payload (opcional)

  // Criar mensagem SQS
  const message = {
    Body: JSON.stringify(req.body),
    QueueUrl: "URL_DA_SUA_FILA_SQS",
  };

  // Enviar mensagem para a fila
  sqs.sendMessage(message, (err, data) => {
    if (err) {
      console.error("Erro ao enviar mensagem para SQS:", err);
      res.status(500).send({ message: "Erro ao processar transação" });
    } else {
      console.log("Mensagem enviada para SQS:", data.MessageId);
      res.status(201).send({ message: "Transação criada com sucesso!" });
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor em execução na porta 3000");
});
