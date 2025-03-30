import React, { useState } from "react";
import { useAuth } from "../src/context/AuthContext";
import API from "../services/axios";

const AddTransaction = () => {
  const { token, userId } = useAuth();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const transaction = {
      userId,
      category,
      type,
      amount: Number(amount),
      paymentMethod,
      description,
      date,
    };

    try {
      await API.post("/transactions", transaction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ Transaction added successfully!");
      clearForm();
    } catch (error) {
      console.error("❌ Error adding transaction:", error);
      setMessage("❌ Failed to add transaction.");
    }
  };

  const clearForm = () => {
    setCategory("");
    setType("");
    setAmount("");
    setPaymentMethod("");
    setDescription("");
    setDate("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Add Transaction
        </h2>

        {message && (
          <div
            className={`text-center font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <select
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        />

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <textarea
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
