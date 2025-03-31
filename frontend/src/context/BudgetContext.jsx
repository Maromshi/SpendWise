import { createContext, useContext, useState, useEffect } from "react";
import api from "../../services/axios";
import { useAuth } from "./AuthContext";
import React from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const { userId, token } = useAuth();
  const [budgetData, setBudgetData] = useState({
    monthlyBudget: 0,
    spent: 0,
    remaining: 0,
    recentActivity: {
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
    },
  });

  const fetchBudgetData = async () => {
    if (!userId || !token) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [budgetRes, transactionsRes] = await Promise.all([
        api.get(`/users/budget/${userId}`, config),
        api.get(`/transactions/user/${userId}`, config),
      ]);

      const budget = budgetRes.data.budget;
      const transactions = transactionsRes.data;

      // Calculate expenses by periods
      const today = new Date();
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const recentActivity = transactions.reduce(
        (acc, trans) => {
          if (trans.type !== "expense") return acc;
          const transDate = new Date(trans.date);

          if (transDate.toDateString() === new Date().toDateString()) {
            acc.today += trans.amount;
          }
          if (transDate >= startOfWeek) {
            acc.thisWeek += trans.amount;
          }
          if (transDate >= startOfMonth) {
            acc.thisMonth += trans.amount;
          }
          return acc;
        },
        { today: 0, thisWeek: 0, thisMonth: 0 }
      );

      const totalSpent = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      setBudgetData({
        monthlyBudget: budget,
        spent: totalSpent,
        remaining: budget - totalSpent,
        recentActivity,
      });
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchBudgetData();
    }
  }, [userId, token]);

  return (
    <BudgetContext.Provider
      value={{ ...budgetData, refreshBudget: fetchBudgetData }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
