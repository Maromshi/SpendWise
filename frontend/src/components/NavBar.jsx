import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  // NavLink component to handle the active state of the links
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative px-4 py-2 transition-all duration-300 hover:text-indigo-600
          ${isActive ? "text-indigo-600" : "text-gray-600"}
          after:content-[''] after:absolute after:w-full after:h-0.5 
          after:bg-indigo-600 after:left-0 after:bottom-0 
          after:scale-x-0 hover:after:scale-x-100 
          after:transition-transform after:duration-300
          ${isActive ? "after:scale-x-100" : ""}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              SpendWise
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <NavLink to="/transactions/add-transaction">
                  Add Transaction
                </NavLink>
                <NavLink to={`/transactions/${localStorage.getItem("userId")}`}>
                  Transactions
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 
                    transition-colors duration-300 focus:outline-none focus:ring-2 
                    focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/transactions/login">Login</NavLink>
                <Link
                  to="/transactions/register"
                  className="px-4 py-2 text-white bg-indigo-600 rounded-md 
                    hover:bg-indigo-500 transition-colors duration-300 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 
                    focus:ring-offset-2"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 
                hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 
                focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {token ? (
            <>
              <Link
                to="/transactions/add-transaction"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Add Transaction
              </Link>
              <Link
                to={`/transactions/${localStorage.getItem("userId")}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Transactions
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-900 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/transactions/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/transactions/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-900 hover:bg-gray-50"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
