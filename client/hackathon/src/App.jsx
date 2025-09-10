import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import RoleSelection from "./components/Role/Role.jsx";
import AdminLogin from "./components/forms/AdminLogin.jsx";
import PatientForm from "./components/forms/PatientForm.jsx";
import DonorForm from "./components/forms/DonorForm.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/donor-form" element={<DonorForm />} />
        <Route path="/patient-form" element={<PatientForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
