import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Transactions from "../pages/Transaction";
import AddTransaction from "../pages/AddTransaction";
import React from "react";
import NavBar from "./components/NavBar";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

const HomePage = () => {
  const { token, userId } = useAuth();

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to SpendWise
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take control of your finances with our smart expense tracking
            solution
          </p>
          <div className="space-x-4">
            <Link
              to="/transactions/register"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-500 transition-colors duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/transactions/login"
              className="inline-block border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-md hover:bg-indigo-50 transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/transactions/add-transaction"
              className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition-colors"
            >
              Add Transaction
            </Link>
            <Link
              to={`/transactions/${userId}`}
              className="block w-full text-center border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50 transition-colors"
            >
              View Transactions
            </Link>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Today's Expenses</span>
              <span className="font-semibold">₪0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">This Week</span>
              <span className="font-semibold">₪0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">This Month</span>
              <span className="font-semibold">₪0</span>
            </div>
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
              <span className="font-semibold">₪5,000</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Spent</span>
              <span className="font-semibold text-red-600">₪0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Remaining</span>
              <span className="font-semibold text-green-600">₪5,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-indigo-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-indigo-900 mb-3">
          💡 Financial Tip
        </h2>
        <p className="text-indigo-700">
          Try to save at least 20% of your monthly income for long-term
          financial goals and emergencies.
        </p>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <main className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/transactions/:userId" element={<Transactions />} />
              <Route
                path="/transactions/add-transaction"
                element={<AddTransaction />}
              />
              <Route path="transactions/login" element={<Login />} />
              <Route path="transactions/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
