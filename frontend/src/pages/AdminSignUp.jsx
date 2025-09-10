import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import adminStore from "../store/adminStore.js";

export default function AdminSignUp() {
  const navigate = useNavigate();
  const { registerAdmin, generatePassword, message, error, isLoading } = adminStore();

  const [form, setForm] = useState({
    role: "",
    gender: "",
    contactInfo: {
      phone: "",
      address: ""
    },
    location: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [credentials, setCredentials] = useState(null);
  const [showCredentialsPopup, setShowCredentialsPopup] = useState(false);
  const [adminId, setAdminId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm({
        ...form,
        [parent]: {
          ...form[parent],
          [child]: value
        }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateForm = () => {
    if (!form.role || !form.gender || !form.contactInfo.phone || !form.contactInfo.address || !form.location) {
      setErrorMsg("⚠️ Please fill in all fields");
      return false;
    }

    const validRoles = ['admin', 'hospital', 'medical'];
    if (!validRoles.includes(form.role)) {
      setErrorMsg("⚠️ Role must be one of: admin, hospital, medical");
      return false;
    }

    const validGenders = ['male', 'female', 'other'];
    if (!validGenders.includes(form.gender)) {
      setErrorMsg("⚠️ Gender must be one of: male, female, other");
      return false;
    }

    setErrorMsg("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    
    try {
        console.log("Submitting form:", form);
      // 1️⃣ Register admin
      const adminData = {
        ...form,
        user: localStorage.getItem("userId") // Assuming you have the user ID stored
      };
      
      const registeredAdmin = await registerAdmin(adminData);
      console.log("✅ Admin registration success:", registeredAdmin);
      
      setAdminId(registeredAdmin._id);
      setSuccessMsg("✅ Admin registered successfully! Generate credentials to complete setup.");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "❌ Admin registration failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCredentials = async () => {
    setLoading(true);
    setErrorMsg("");
    
    try {
      // 2️⃣ Generate credentials
      const creds = await generatePassword();
      console.log("✅ Admin credentials generated:", creds);
      
      setCredentials(creds);
      setShowCredentialsPopup(true);
      setSuccessMsg("✅ Credentials generated successfully!");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "❌ Failed to generate credentials!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowCredentialsPopup(false);
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900">Create Admin Account</h2>
        <p className="mt-1 text-sm text-gray-600">Fill in admin details to register</p>

        {/* Error Message */}
        {errorMsg && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded-md">
            {errorMsg}
          </p>
        )}

        {/* Success Message */}
        {successMsg && (
          <p className="mt-3 text-sm text-green-600 bg-green-50 p-2 rounded-md">
            {successMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-700 focus:ring-green-700"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="hospital">Hospital</option>
              <option value="medical">Medical</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-700 focus:ring-green-700"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Contact Info - Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Phone Number</label>
            <input
              type="tel"
              name="contactInfo.phone"
              value={form.contactInfo.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
              required
            />
          </div>

          {/* Contact Info - Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Address</label>
            <textarea
              name="contactInfo.address"
              value={form.contactInfo.address}
              onChange={handleChange}
              placeholder="Enter full address"
              rows={3}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-700 focus:ring-green-700"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || adminId}
            className={`w-full rounded-md bg-green-800 px-4 py-2 text-sm font-medium text-white ${
              loading || adminId ? "opacity-50 cursor-not-allowed" : "hover:bg-green-900"
            }`}
          >
            {loading ? "Registering..." : adminId ? "Registered Successfully" : "Register Admin"}
          </button>
        </form>

        {/* Generate Credentials Button (shown after successful registration) */}
        {adminId && (
          <div className="mt-4">
            <button
              onClick={handleGenerateCredentials}
              disabled={loading || credentials}
              className={`w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white ${
                loading || credentials ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Generating..." : credentials ? "Credentials Generated" : "Generate Login Credentials"}
            </button>
          </div>
        )}

        {/* Credentials Popup */}
        {showCredentialsPopup && credentials && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Admin Credentials Generated</h3>
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <p className="text-sm text-blue-800 font-semibold">Your login credentials:</p>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-800">Username:</span>
                    <span className="text-sm text-blue-800 font-mono">{credentials.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-800">Password:</span>
                    <span className="text-sm text-blue-800 font-mono">{credentials.password}</span>
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-3">
                  ⚠️ Please save these credentials securely. You will need them to login.
                </p>
              </div>
              <button
                onClick={handleClosePopup}
                className="w-full rounded-md bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900"
              >
                Continue to Login
              </button>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex w-1/2 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FcGoogle className="text-lg" />
            Sign up with Google
          </button>

          <button className="flex w-1/2 items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FaApple className="text-lg" />
            Sign up with Apple
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an admin account?{" "}
          <Link to={"/admin/login"} className="font-medium text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}