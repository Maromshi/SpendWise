const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectRabbit } = require("./utils/rabbit");

require("dotenv").config();

const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transcations");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB
if (require.main === module) {
  connectDB();
  connectRabbit(); // Connect to RabbitMQ
  console.log("🧪 connectRabbit() called from server.js");

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
