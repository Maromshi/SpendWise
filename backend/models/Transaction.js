const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      // will use as a referense to User Schema
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["income", "expense"], required: true }, // type of deal
    category: { type: String, required: true }, // Category - food , rent . ..
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    date: { type: Date, default: Date.now }, //when deal has made
    description: { type: String },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
