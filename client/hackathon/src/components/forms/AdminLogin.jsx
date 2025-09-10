import React, { useState } from "react";

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Login:", credentials);
    // 👉 Call your admin login API here
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-red-50 rounded-xl shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-red-700 text-center">
        Admin Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
