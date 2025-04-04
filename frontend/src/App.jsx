import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BudgetProvider } from "./context/BudgetContext";
import { LanguageProvider } from "./context/LanguageContext";
import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Transactions from "../pages/Transaction";
import AddTransaction from "../pages/AddTransaction";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BudgetProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <NavBar />
              <main className="container mx-auto px-4">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/transactions/:userId"
                    element={<Transactions />}
                  />
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
        </BudgetProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
