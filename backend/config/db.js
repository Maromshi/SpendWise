const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGO_URI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/spendwise";

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
