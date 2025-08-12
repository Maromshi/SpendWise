// test_producer.js
const amqp = require("amqplib");

const message = {
  text: "Simple message",
  timestamp: new Date(),
};

async function sendTestMessage() {
  console.log("TEST PRODUCER: Attempting to send a message...");
  try {
    //connet to rabbitMQ
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();

    const queueName = "transactions";
    await channel.assertQueue(queueName);

    // send to Queue
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

    console.log(
      `✅ TEST PRODUCER: Message sent successfully to queue '${queueName}'`
    );

    //close connection
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error("❌ TEST PRODUCER: Failed to send message:", error.message);
  }
}

sendTestMessage();

