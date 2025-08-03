// test_producer.js
const amqp = require("amqplib");

// ההודעה שברצונך לשלוח
const message = {
  text: "זוהי הודעת בדיקה פשוטה!",
  timestamp: new Date(),
};

async function sendTestMessage() {
  console.log("TEST PRODUCER: Attempting to send a message...");
  try {
    // התחבר ל-RabbitMQ דרך שם השירות של דוקר
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();

    const queueName = "transactions";
    await channel.assertQueue(queueName);

    // שלח את ההודעה לתור
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

    console.log(
      `✅ TEST PRODUCER: Message sent successfully to queue '${queueName}'`
    );

    // סגור את החיבור לאחר שליחה
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error("❌ TEST PRODUCER: Failed to send message:", error.message);
  }
}

sendTestMessage();
