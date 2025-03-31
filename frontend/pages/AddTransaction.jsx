import React, { useState, useEffect } from "react";
import { useAuth } from "../src/context/AuthContext";
import { useBudget } from "../src/context/BudgetContext";
import api from "../services/axios";

const AddTransaction = () => {
  const { userId } = useAuth();
  const { monthlyBudget, refreshBudget } = useBudget();
  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "",
  });
  const [currentBudget, setCurrentBudget] = useState(null);
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  const fetchBudget = async () => {
    if (!userId) return;
    try {
      const response = await api.get(`/users/budget/${userId}`);
      setCurrentBudget(response.data.budget);
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [userId]);

  const handleEditBudgetClick = () => {
    setIsEditingBudget(true);
    fetchBudget();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditingBudget) {
        await api.post("/users/budget", {
          userId,
          amount: Number(formData.amount),
        });
      } else {
        await api.post("/transactions", {
          userId,
          amount: Number(formData.amount),
          type: formData.type,
          category: formData.category,
          description: formData.description,
          date: formData.date,
          paymentMethod: formData.paymentMethod,
        });

        if (formData.type === "expense") {
          const newBudget = currentBudget - Number(formData.amount);
          await api.post("/users/budget", {
            userId,
            amount: newBudget,
          });
        }
      }

      await refreshBudget();

      setFormData({
        amount: "",
        type: "expense",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        paymentMethod: "",
        isBudget: false,
      });
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Error occurred while saving. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Deal</h2>

      {/* Current Budget Display */}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <div className="flex justify-between items-center">
          <span>Current Monthly Budget:</span>
          <span className="font-bold">${currentBudget}</span>
          <button
            type="button"
            onClick={() => setIsEditingBudget(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit Budget
          </button>
        </div>
      </div>

      {/* Transaction Form */}
      <form onSubmit={handleSubmit}>
        {/* Type */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Deal Type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === "expense"}
                onChange={handleChange}
                className="mr-2"
              />
              Expense
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === "income"}
                onChange={handleChange}
                className="mr-2"
              />
              Income
            </label>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="cash">Cash</option>
            <option value="transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="rent">Rent</option>
            <option value="bills">Bills</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Deal
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
