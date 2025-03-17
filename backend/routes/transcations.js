const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

// Transaction by ID
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const allTransactions = await Transaction.find({ userId });
    res.json(allTransactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

// Add Transaction
router.post("/", async (req, res) => {
  try {
    const { userId, type, category, amount, paymentMethod, date, description } =
      req.body;

    if (!userId || !type || !category || !amount || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTransaction = new Transaction({
      userId,
      type,
      category,
      amount,
      paymentMethod,
      date: date || new Date(), // default date - today
      description,
    });

    await newTransaction.save();
    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating transaction" });
  }
});
router.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedTransactions = await Transaction.deleteMany({ userId });
    if (deletedTransactions.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    res.status(200).json({
      message: "All transactions for this user deleted successfully!!",
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting transactions" });
  }
});
// Update transaction
router.put("/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully!",
      transaction: updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating transaction" });
  }
});

module.exports = router;
