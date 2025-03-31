const express = require("express");
const Transaction = require("../models/Transaction");
const { protect } = require("../middleware/authenticationMiddleware");

const router = express.Router();

// Transactions by userID
router.get("/user/:userId", protect, async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/transactions/single/:transactionId", protect, async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transaction" });
  }
});

// Add Transaction
router.post("/", protect, async (req, res) => {
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
router.delete("/user/:userId", protect, async (req, res) => {
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
router.put("/:transactionId", protect, async (req, res) => {
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

// Delete single transaction
router.delete("/:transactionId", protect, async (req, res) => {
  try {
    const { transactionId } = req.params;
    const deletedTransaction =
      await Transaction.findByIdAndDelete(transactionId);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      transaction: deletedTransaction,
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting transaction" });
  }
});

module.exports = router;
