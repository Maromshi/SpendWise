import React, { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { useBudget } from "../context/BudgetContext";

const HomePage = () => {
  const { token } = useAuth();
  const { monthlyBudget, spent, remaining, recentActivity } = useBudget();

  if (!token) {
    return <div>Login</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... existing JSX ... */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* ... Quick Actions ... */}

        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Today's Expenses</span>
              <span className="font-semibold">₪{recentActivity.today}</span>
            </div>
            {/* ... other activity items ... */}
          </div>
        </div>

        {/* Budget Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Budget Overview
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Monthly Budget</span>
              <span className="font-semibold">₪{monthlyBudget}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Spent</span>
              <span className="font-semibold text-red-600">₪{spent}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Remaining</span>
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
    </div>
  );
};

export default HomePage;
