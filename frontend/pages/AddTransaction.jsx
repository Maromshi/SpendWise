import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import { useBudget } from "../src/context/BudgetContext";
import { useLanguage } from "../src/context/LanguageContext";
import React from "react";
import API from "../services/axios";

const AddTransaction = () => {
  const navigate = useNavigate();
  const { token, userId } = useAuth();
  const { refreshBudget } = useBudget();
  const { t, language, toggleLanguage } = useLanguage();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!token || !userId) {
      navigate("/transactions/login");
    }
  }, [token, userId, navigate]);

  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "food",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "credit",
    description: "",
  });

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData({
      ...formData,
      type: newType,
      category: newType === "expense" ? "food" : "salary",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID is missing");
      alert(t("loginRequired"));
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Add the transaction
      const transactionData = {
        ...formData,
        userId: userId,
        amount: Number(formData.amount),
      };

      await API.post("/transactions", transactionData, config);

      // Update budget based on transaction type
      const response = await API.get(`/users/budget/${userId}`);
      const currentBudget = response.data.budget;

      const newBudget =
        formData.type === "expense"
          ? currentBudget - Number(formData.amount)
          : currentBudget + Number(formData.amount);

      await API.post(
        "/users/budget",
        {
          userId: userId,
          amount: newBudget,
        },
        config
      );

      await refreshBudget();
      navigate(`/transactions/${userId}`);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert(t("addDealError"));
    }
  };

  // אם אין משתמש מחובר, נציג טעינה
  if (!userId || !token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  // Get the appropriate categories based on transaction type
  const categories =
    formData.type === "expense"
      ? t("expenseCategories")
      : t("incomeCategories");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Language Toggle Button */}
      <div className="max-w-2xl mx-auto mb-8 flex justify-end">
        <button
          onClick={toggleLanguage}
          className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-sm border border-indigo-200"
        >
          {language === "he" ? "🇺🇸 English" : "🇮🇱 עברית"}
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6 bg-indigo-600">
          <h2 className="text-2xl font-bold text-white text-center">
            {t("addNewDeal")}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deal Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("dealType")}
              </label>
              <select
                value={formData.type}
                onChange={handleTypeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="expense">{t("expense")}</option>
                <option value="income">{t("income")}</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("amount")}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₪
                </span>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("category")}
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                {Object.entries(categories).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("date")}
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("paymentMethod")}
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                {Object.entries(t("paymentMethods")).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("description")}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                rows="3"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(`/transactions/${userId}`)}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              {t("addDeal")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
