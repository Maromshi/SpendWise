import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../context/LanguageContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Dashboard = ({ transactions }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    if (transactions) {
      // עיבוד נתונים לפי חודשים
      const monthlyStats = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

        if (!acc[monthYear]) {
          acc[monthYear] = { income: 0, expenses: 0 };
        }

        if (transaction.type === "income") {
          acc[monthYear].income += transaction.amount;
        } else {
          acc[monthYear].expenses += transaction.amount;
        }

        return acc;
      }, {});

      // עיבוד נתונים לפי קטגוריות
      const categoryStats = transactions.reduce((acc, transaction) => {
        const categoryKey =
          transaction.type === "income"
            ? `incomeCategories.${transaction.category}`
            : `expenseCategories.${transaction.category}`;

        if (!acc[categoryKey]) {
          acc[categoryKey] = 0;
        }
        acc[categoryKey] += transaction.amount;
        return acc;
      }, {});

      setMonthlyData(
        Object.entries(monthlyStats).map(([month, data]) => ({
          month,
          ...data,
        }))
      );

      setCategoryData(
        Object.entries(categoryStats).map(([categoryKey, amount]) => ({
          category: t(categoryKey),
          categoryKey,
          amount,
        }))
      );
    }
  }, [transactions, t]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {t("financialDashboard")}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* גרף הכנסות והוצאות חודשי */}
        <div className="bg-white p-4 rounded-lg shadow flex-1">
          <h3 className="text-xl font-semibold mb-4">{t("monthlySummary")}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #f0f0f0",
                }}
              />
              <Legend />
              <Bar dataKey="income" name={t("income")} fill="#00C49F" />
              <Bar dataKey="expenses" name={t("expenses")} fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* גרף פאי לפי קטגוריות */}
        <div className="bg-white p-4 rounded-lg shadow flex-1">
          <h3 className="text-xl font-semibold mb-4">
            {t("categoryDistribution")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #f0f0f0",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
