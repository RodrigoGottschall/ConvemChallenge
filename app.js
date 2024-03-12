require("dotenv").config();

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
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params = {
    QueueUrl: process.env.AWS_SQS_QUEUE_URL,
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

// Função Lambda para processar transações
exports.handler = async (event, context) => {
  const dynamodb = new AWS.DynamoDB({
    region: process.env.AWS_REGION,
  });

  const sqsRecord = event.Records[0];
  const messageBody = JSON.parse(sqsRecord.body);

  const params = {
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
    Item: {
      idempotencyId: { S: messageBody.idempotencyId },
      amount: { N: messageBody.amount.toString() },
      type: { S: messageBody.type },
      timestamp: { S: new Date().toISOString() },
    },
  };

  await dynamodb.putItem(params).promise();
};
