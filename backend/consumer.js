const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://rabbitmq"; // התחברות דרך שם השירות של דוקר

async function consumeMessages() {
  console.log("CONSUMER: Attempting to connect to RabbitMQ...");
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    const queueName = "transactions"; // שם התור שאליו ה-Producer שולח
    await channel.assertQueue(queueName);

    console.log(
      `✅ CONSUMER: Connected and waiting for messages in queue '${queueName}'`
    );

    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        // מדפיסים את ההודעה שהתקבלה
        console.log("📬 CONSUMER: Received message:", messageContent);

        // מאשרים ל-RabbitMQ שההודעה טופלה בהצלחה
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error(
      "❌ CONSUMER: Failed to connect or consume messages:",
      error.message
    );
    // נסה להתחבר שוב אחרי 5 שניות אם יש כשל
    setTimeout(consumeMessages, 5000);
  }
}

// התחל את תהליך ההאזנה
consumeMessages();
