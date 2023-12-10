const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const message = {
  reporte: "palmicultores",
  correo: "carlos.santander@gmail.com",
  filtros: {
    sede: "tocache",
    estado: "afiliado",
  },
};

const getQueueUrl = async (queueName) => {
  const params = {
    QueueName: queueName,
  };
  const data = await sqs.getQueueUrl(params).promise();
  return data.QueueUrl;
};

const sendMessage = async (message) => {
  const queueName = "queuetest";
  const queueUrl = await getQueueUrl(queueName);

  const sendMessageParams = {
    MessageBody: JSON.stringify(message),
    QueueUrl: queueUrl,
  };

  try {
    // Envar mensaje a la cola
    const data = await sqs.sendMessage(sendMessageParams).promise();
    console.log("Mensaje enviado con éxito =>", data.MessageId);
  } catch (error) {
    console.log("Hubo un error en enviar el mensaje =>", error);
  }
};

sendMessage(message);
