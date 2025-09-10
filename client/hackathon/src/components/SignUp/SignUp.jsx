import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaApple } from "react-icons/fa"; // Apple icon
import { Link, useNavigate } from "react-router-dom"; // Navigation and routing
import userStore from "../../store/userStore.js";

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp, error, message, isLoading } = userStore();

  // Local state for form data
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // States for loading and error handling
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Update state when input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate form before submit
  const validateForm = () => {
    if (!form.fullName || !form.email || !form.password) {
      setErrorMsg("⚠️ Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg("⚠️ Enter a valid email address");
      return false;
    }

    if (form.password.length < 6) {
      setErrorMsg("⚠️ Password must be at least 6 characters long");
      return false;
    }

    setErrorMsg("");
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Call signup API with form data
      // const { data } = await SignUp(form.name, form.email, form.password);
      await signUp(form);
      console.log("✅ Signup success:", form);


      // Redirect to login page on successful signup
      navigate("/login");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "❌ Signup failed, try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 py-10">
        {/* -------- Page Heading -------- */}
        <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
        <p className="mt-1 text-sm text-gray-600">
          Fill in your details to sign up
        </p>

        {/* -------- Error Message -------- */}
        {errorMsg && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded-md">
            {errorMsg}
          </p>
        )}

        {/* -------- Signup Form -------- */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md bg-green-800 px-4 py-2 text-sm font-medium text-white ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-900"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* -------- Divider Line -------- */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        {/* -------- Social Signup Options -------- */}
        <div className="flex gap-3">
          {/* Google Signup Button */}
          <button className="flex w-1/2 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FcGoogle className="text-lg" />
            Sign up with Google
          </button>

          {/* Apple Signup Button */}
          <button className="flex w-1/2 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FaApple className="text-lg" />
            Sign up with Apple
          </button>
        </div>

        {/* -------- Link to Login Page -------- */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
