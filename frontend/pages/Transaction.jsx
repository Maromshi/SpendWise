import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import API from "../services/axios";
import { useAuth } from "../src/context/AuthContext";
import { useBudget } from "../src/context/BudgetContext";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { userId } = useParams();
  const { token } = useAuth();
  const { refreshBudget } = useBudget();

  const fetchTransactions = async () => {
    try {
      const response = await API.get(`/transactions/user/${userId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchTransactions();
    }
  }, [userId, token]);

  const handleUpdate = async (transactionId) => {
    try {
      await API.put(`/transactions/${transactionId}`, editingTransaction);
      setEditingTransaction(null);
      fetchTransactions();
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction");
    }
  };

  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const transactionToDelete = transactions.find(
          (t) => t._id === transactionId
        );

        await API.delete(`/transactions/${transactionId}`, config);

        if (transactionToDelete.type === "expense") {
          const response = await API.get(`/users/budget/${userId}`);
          const currentBudget = response.data.budget;
          await API.post(
            "/users/budget",
            {
              userId,
              amount: currentBudget + Number(transactionToDelete.amount),
            },
            config
          );
        }

        await refreshBudget();
        fetchTransactions();
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("Failed to delete transaction");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Deals</h2>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No deals found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th>Deal Type</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id} className="bg-white border-b">
                    {editingTransaction &&
                    editingTransaction._id === transaction._id ? (
                      <>
                        <td className="px-6 py-4">
                          <select
                            value={editingTransaction.type}
                            onChange={(e) =>
                              setEditingTransaction({
                                ...editingTransaction,
                                type: e.target.value,
                              })
                            }
                            className="border rounded p-1"
                          >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editingTransaction.category}
                            onChange={(e) =>
                              setEditingTransaction({
                                ...editingTransaction,
                                category: e.target.value,
                              })
                            }
                            className="border rounded p-1"
                          >
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="rent">Rent</option>
                            <option value="bills">Bills</option>
                            <option value="other">Other</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={editingTransaction.amount}
                            onChange={(e) =>
                              setEditingTransaction({
                                ...editingTransaction,
                                amount: e.target.value,
                              })
                            }
                            className="border rounded p-1 w-24"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editingTransaction.paymentMethod}
                            onChange={(e) =>
                              setEditingTransaction({
                                ...editingTransaction,
                                paymentMethod: e.target.value,
                              })
                            }
                            className="border rounded p-1"
                          >
                            <option value="credit">Credit Card</option>
                            <option value="debit">Debit Card</option>
                            <option value="cash">Cash</option>
                            <option value="transfer">Bank Transfer</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="date"
                            value={editingTransaction.date.split("T")[0]}
                            onChange={(e) =>
                              setEditingTransaction({
                                ...editingTransaction,
                                date: e.target.value,
                              })
                            }
                            className="border rounded p-1"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleUpdate(transaction._id)}
                            className="text-green-600 hover:text-green-800 mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingTransaction(null)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">{transaction.type}</td>
                        <td className="px-6 py-4">{transaction.amount} ₪</td>
                        <td className="px-6 py-4">{transaction.category}</td>
                        <td className="px-6 py-4">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setEditingTransaction(transaction)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(transaction._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b">
                  <td colSpan="6" className="px-6 py-4 text-center">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
