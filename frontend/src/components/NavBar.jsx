import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
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
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
      </nav>
    </>
  );
};
export default NavBar;
