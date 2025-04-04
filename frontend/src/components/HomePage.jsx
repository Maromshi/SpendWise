import React from "react";
import { useAuth } from "../context/AuthContext";
import { useBudget } from "../context/BudgetContext";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { token, userId } = useAuth();
  const { monthlyBudget, spent, remaining, recentActivity } = useBudget();
  const { t, language, toggleLanguage } = useLanguage();

  // calculate budget usage percentage
  const budgetUsagePercent =
    Math.min(100, Math.round((spent / monthlyBudget) * 100)) || 0;

  // smart tips based on budget usage
  const getBudgetTip = () => {
    if (budgetUsagePercent >= 90) {
      return t("tips.danger");
    } else if (budgetUsagePercent >= 75) {
      return t("tips.warning");
    } else if (budgetUsagePercent <= 20) {
      return t("tips.success");
    }
    return t("tips.default");
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            {t("welcome")}
          </h1>
          <p className="text-gray-600 mb-8">{t("welcomeSubtitle")}</p>
          <div className="space-x-4">
            <Link
              to="/transactions/login"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              {t("login")}
            </Link>
            <Link
              to="/transactions/register"
              className="bg-white text-indigo-600 px-6 py-2 rounded-md border border-indigo-600 hover:bg-indigo-50"
            >
              {t("register")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Language Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleLanguage}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          {language === "he" ? "🇺🇸 English" : "🇮🇱 עברית"}
        </button>
      </div>

      {/* כותרת ראשית */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">{t("welcome")}</h1>
        <p className="text-gray-600 mt-2">{t("welcomeSubtitle")}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t("quickActions")}
          </h2>
          <div className="space-y-4">
            <Link
              to="/transactions/add-transaction"
              className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              ➕ {t("addNewDeal")}
            </Link>
            <Link
              to={`/transactions/${userId}`}
              className="block w-full text-center bg-gray-100 text-gray-800 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              📊 {t("viewAllDeals")}
            </Link>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t("recentActivity")}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">{t("todayExpenses")}</span>
              <span className="font-semibold">₪{recentActivity.today}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">{t("weekExpenses")}</span>
              <span className="font-semibold">₪{recentActivity.thisWeek}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">{t("monthExpenses")}</span>
              <span className="font-semibold">₪{recentActivity.thisMonth}</span>
            </div>
          </div>
        </div>

        {/* Budget Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t("budgetOverview")}
          </h2>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  budgetUsagePercent >= 90
                    ? "bg-red-500"
                    : budgetUsagePercent >= 75
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${budgetUsagePercent}%` }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              {budgetUsagePercent}% {t("budgetUsed")}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{t("monthlyBudget")}</span>
              <span className="font-semibold">₪{monthlyBudget}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{t("expenses")}</span>
              <span className="font-semibold text-red-600">₪{spent}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{t("remaining")}</span>
              <span
                className={`font-semibold ${
                  remaining >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₪{remaining}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Tips Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("smartTip")}
            </h2>
            <p className="text-gray-600">{getBudgetTip()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
