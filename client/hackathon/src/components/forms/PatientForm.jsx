import React, { useState } from "react";

function PatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    organNeeded: "",
    medicalCondition: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Form Submitted:", formData);
    // 👉 Call your patient API here
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-green-50 rounded-xl shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
        Patient Registration Form
      </h2>
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
          name="organNeeded"
          placeholder="Organ Needed"
          value={formData.organNeeded}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />
        <textarea
          name="medicalCondition"
          placeholder="Medical Condition"
          value={formData.medicalCondition}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PatientForm;
