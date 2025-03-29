import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Transactions from "../pages/Transaction";
import AddTransaction from "../pages/AddTransaction";
import React from "react";
import NavBar from "./components/NavBar";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
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
            <Route path="transactions/login" element={<Login />} />
            <Route path="transactions/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
