import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Transactions from "../pages/Transaction";
import AddTransaction from "../pages/AddTransaction";
import React from "react";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4 flex justify-center gap-6 text-blue-600 font-semibold">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link
            to="/transactions/652b6a5c3e5a8c2b3a4b1e22"
            className="hover:underline"
          >
            Transactions
          </Link>
          <Link to="/transactions/add-transaction" className="hover:underline">
            Add Transaction
          </Link>
        </nav>

        <main className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-2xl text-center mt-10">
                  Welcome to SpendWise
                </h1>
              }
            />
            <Route path="/transactions/:userId" element={<Transactions />} />
            <Route
              path="/transactions/add-transaction"
              element={<AddTransaction />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
