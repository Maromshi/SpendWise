const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const transactionRoutes = require("./routes/transcations");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

// Connected to MongoDB
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/spendwise";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB", mongoose.connection.name))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
  console.log("📦 DB Name:", mongoose.connection.name);
});

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
