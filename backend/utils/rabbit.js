const amqp = require("amqplib");

let channel;
const MAX_RETRIES = 10;
const RETRY_DELAY = 5000; // 5 שניות

async function connectRabbit(retries = 0) {
  if (retries >= MAX_RETRIES) {
    console.error(
      "❌ Gave up connecting to RabbitMQ after",
      MAX_RETRIES,
      "attempts."
    );
    return;
  }

  try {
    // מחרוזת החיבור שלך נכונה! היא משתמשת בשם השירות 'rabbitmq'
    const connection = await amqp.connect("amqp://rabbitmq");

    // מאזין לאירועי סגירה או שגיאה כדי לנסות להתחבר מחדש בעתיד
    connection.on("close", () => {
      console.error(
        "❗️ RabbitMQ connection closed! Attempting to reconnect..."
      );
      channel = null; // מאפס את הערוץ
      connectRabbit();
    });
    connection.on("error", (err) => {
      console.error("❗️ RabbitMQ connection error:", err.message);
    });

    channel = await connection.createChannel();
    await channel.assertQueue("transactions");
    console.log("✅✅✅ Connected to RabbitMQ successfully!");
  } catch (error) {
    console.error(
      `❌ Failed to connect to RabbitMQ (attempt ${
        retries + 1
      }/${MAX_RETRIES}):`,
      error.message
    );
    console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
    // ממתין 5 שניות ומנסה שוב
    setTimeout(() => connectRabbit(retries + 1), RETRY_DELAY);
  }
}

async function sendToQueue(message) {
  if (!channel) {
    console.warn("⚠️ RabbitMQ channel is not available. Message was not sent.");
    return;
  }
  try {
    channel.sendToQueue("transactions", Buffer.from(JSON.stringify(message)));
  } catch (error) {
    console.error("❌ Failed to send message to RabbitMQ:", error.message);
  }
}

module.exports = { connectRabbit, sendToQueue };
