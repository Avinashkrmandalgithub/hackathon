import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import donorStore from "../store/donorStore";

export default function DonorForm() {
  const navigate = useNavigate();
  const createDonor = donorStore((state) => state.createDonor);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
    bloodGroup: "",
    contactInfo: {
      phone: "",
      address: ""
    },
    location: "",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith("contactInfo.")) {
      // Handle nested contactInfo fields
      const field = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value
        }
      }));
    } else {
      // Handle regular fields
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Convert age, weight, height to proper types
    const submitData = {
      ...formData,
      age: parseInt(formData.age),
      weight: formData.weight.toString(),
      height: formData.height.toString(),
    };

    try {
      await createDonor(submitData);
      navigate("/donor-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-3">
              <Heart className="w-8 h-8 text-red-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">
                Organ Donor Registration
              </h2>
            </div>
            <p className="text-gray-600">
              Please fill out your details to register as an organ donor.
            </p>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="65"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Blood Type</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="location"
                  placeholder="City"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="tel"
                  name="contactInfo.phone"
                  placeholder="Phone Number"
                  value={formData.contactInfo.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="number"
                  name="height"
                  placeholder="Height (cm)"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <textarea
                  name="contactInfo.address"
                  placeholder="Address"
                  value={formData.contactInfo.address}
                  onChange={handleChange}
                  required
                  rows="2"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 md:col-span-2"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/role-selection")}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}