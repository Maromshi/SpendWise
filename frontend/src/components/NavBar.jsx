import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-center gap-6 text-blue-600 font-semibold">
      <Link to="/">Home</Link>
      {/* 
//     If the user is logged in, show the Add Transaction, Transactions, and Logout links */}
      {token ? (
        <>
          <Link to="/transactions/add-transaction">Add Transaction</Link>
          <Link to={`/transactions/${localStorage.getItem("userId")}`}>
            Transactions
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/transactions/login">Login</Link>
          <Link to="/transactions/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
