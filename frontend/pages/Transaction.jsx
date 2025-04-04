import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import API from "../services/axios";
import { useAuth } from "../src/context/AuthContext";
import { useBudget } from "../src/context/BudgetContext";
import { useLanguage } from "../src/context/LanguageContext";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { userId } = useParams();
  const { token } = useAuth();
  const { refreshBudget } = useBudget();
  const { t, language, toggleLanguage } = useLanguage();

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
    if (window.confirm(t("confirmDelete"))) {
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
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleLanguage}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          {language === "he" ? "🇺🇸 English" : "🇮🇱 עברית"}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">{t("myDeals")}</h2>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">{t("noDeals")}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th>{t("dealType")}</th>
                <th>{t("amount")}</th>
                <th>{t("category")}</th>
                <th>{t("date")}</th>
                <th>{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
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
                          <option value="expense">{t("expense")}</option>
                          <option value="income">{t("income")}</option>
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        >
                          {Object.entries(
                            editingTransaction.type === "expense"
                              ? t("expenseCategories")
                              : t("incomeCategories")
                          ).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
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
                          {Object.entries(t("paymentMethods")).map(
                            ([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            )
                          )}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleUpdate(transaction._id)}
                          className="text-green-600 hover:text-green-800 mr-2"
                        >
                          {t("save")}
                        </button>
                        <button
                          onClick={() => setEditingTransaction(null)}
                          className="text-red-600 hover:text-red-800"
                        >
                          {t("cancel")}
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">{t(transaction.type)}</td>
                      <td className="px-6 py-4">{transaction.amount} ₪</td>
                      <td className="px-6 py-4">
                        {t(
                          `${
                            transaction.type === "expense"
                              ? "expenseCategories"
                              : "incomeCategories"
                          }.${transaction.category}`
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(transaction.date).toLocaleDateString(
                          language === "he" ? "he-IL" : "en-US"
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setEditingTransaction(transaction)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => handleDelete(transaction._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          {t("delete")}
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
