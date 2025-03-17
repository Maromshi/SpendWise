require("dotenv").config();

const transactionRoutes = require("./routes/transcations");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connected to MongoDB
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/spendwise";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// app.get("/api", (req, res) => {
//   res.json({ message: "SpendWise API is running!" });
// });
app.use("/api", transactionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
