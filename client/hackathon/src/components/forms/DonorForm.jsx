import React, { useState } from "react";
import donorStore from "../../store/donorStore.js";
import { useNavigate } from "react-router-dom";

function DonorForm() {
  const navigate = useNavigate();

  // Access store values & actions
  const { createDonor, isLoading, error, message } = donorStore();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    organ: "",
    medicalHistory: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const donor = await createDonor(formData); // call API from store
      console.log("✅ Donor Created:", donor);

      // redirect donor to their profile/dashboard
      navigate("/donor-dashboard");
    } catch (err) {
      console.error("❌ Donor creation failed:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-blue-50 rounded-xl shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Donor Registration Form
      </h2>

      {/* Show messages */}
      {message && <p className="text-green-600 mb-3">{message}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="text"
          name="organ"
          placeholder="Organ willing to donate"
          value={formData.organ}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />
        <textarea
          name="medicalHistory"
          placeholder="Medical History"
          value={formData.medicalHistory}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          rows="3"
        ></textarea>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default DonorForm;
