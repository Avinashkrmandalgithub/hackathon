import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import adminStore from "../store/adminStore.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin, message, error, isLoading, clearError, clearMessage } = adminStore();

  // Local states
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Clear errors and messages when component mounts
  useEffect(() => {
    clearError();
    clearMessage();
  }, [clearError, clearMessage]);

  // Validation
  const validateForm = () => {
    if (!userName || !password) {
      setErrorMsg("⚠️ Please fill in all fields");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const adminData = { userName, password };
      const admin = await loginAdmin(adminData);
      console.log("✅ Admin login success", admin);
      
      // Store admin token in localStorage
      if (admin.accessToken) {
        localStorage.setItem("adminToken", admin.accessToken);
        localStorage.setItem("adminRefreshToken", admin.refreshToken);
      }
      
      navigate("/admin-dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "❌ Login failed, try again!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 py-10">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter your credentials to access the admin panel
        </p>

        {/* Error Message */}
        {(errorMsg || error) && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded-md">
            {errorMsg || error}
          </p>
        )}

        {/* Success Message (if any) */}
        {message && (
          <p className="mt-3 text-sm text-green-600 bg-green-50 p-2 rounded-md">
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
              required
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-700"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember for 30 days
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-md bg-green-800 px-4 py-2 text-sm font-medium text-white ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-900"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="flex gap-3">
          <button className="flex w-1/2 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FcGoogle className="text-lg" />
            Sign in with Google
          </button>
          <button className="flex w-1/2 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FaApple className="text-lg" />
            Sign in with Apple
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an admin account?{" "}
          <Link
            to={"/admin/signup"}
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}