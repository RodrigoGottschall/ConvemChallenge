const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

const app = express();

app.use(bodyParser.json());

const sqs = new AWS.SQS();

const sendToSQS = async (transaction) => {
  const params = {
    QueueUrl: "https://sqs.sa-east-1.amazonaws.com/211125635976/convemQueue", // Substitua pela URL da sua fila
    MessageBody: JSON.stringify(transaction),
  };

  await sqs.sendMessage(params).promise();
};

app.post("/transactions", async (req, res) => {
  const { idempotencyId, amount, type } = req.body;

  // Validação dos dados (opcional)

  const transaction = {
    idempotencyId,
    amount,
    type,
  };

  await sendToSQS(transaction);

  res.status(201).send("Transação processada com sucesso!");
});

app.listen(3000, () => {
  console.log("Servidor em execução na porta 3000");
});
