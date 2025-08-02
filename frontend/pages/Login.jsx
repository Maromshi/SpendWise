import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import API from "../services/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      // Use the login function from useAuth to store the token, userId and userName
      login(data.token, data.userId, data.name);

      alert("🟢 Logged in successfully!");

      navigate(`/transactions/${data.userId}`);
    } catch (error) {
      console.error("🔴 Login failedd:", error);
      alert(
        "🔴 Login failed: " + (error.response?.data?.message || "Server error")
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <div className="text-center">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <span className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
            Start a free trial
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
