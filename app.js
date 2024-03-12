const express = require("express");
const aws = require("aws-sdk");

const app = express();

app.use(express.json());

app.post("/transacoes", async (req, res) => {
  const { idempotencyId, amount, type } = req.body;

  if (!idempotencyId || !amount || !type) {
    return res.status(400).json({ error: "Dados inválidos." });
  }

  const sqs = new aws.SQS({
    region: "sa-east-1",
  });

  const params = {
    QueueUrl: "https://sqs.sa-east-1.amazonaws.com/211125635976/convemQueue",
    MessageBody: JSON.stringify({
      idempotencyId,
      amount,
      type,
    }),
  };

  await sqs.sendMessage(params).promise();

  res.status(201).json({ message: "Transação enviada com sucesso." });
});

app.listen(3000);
