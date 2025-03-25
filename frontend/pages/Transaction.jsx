import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import API from "../services/axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await API.get(`/transactions/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  return (
    <div className="relative overflow-x-auto">
      <h1>Transactions</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Method
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{transaction.type}</td>
                <td className="px-6 py-4">{transaction.category}</td>
                <td className="px-6 py-4">{transaction.amount} ₪</td>
                <td className="px-6 py-4">{transaction.paymentMethod}</td>
                <td className="px-6 py-4">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td colSpan="5">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
