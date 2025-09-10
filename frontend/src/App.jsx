import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoleSelection from './pages/RoleSelection'
import DonorForm from './components/DonorForm'
import PatientForm from './components/PatientForm'
import DonorDashboard from './pages/DonorDashboard'
import PatientDashboard from './pages/PatientDashboard'
import AdminDashboard from './pages/AdminDashboard'
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminSignUp from './pages/AdminSignUp.jsx'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* sign up / login */}
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/signup' element={<AdminSignUp />} />


      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/donor-form" element={<DonorForm />} />
      <Route path="/patient-form" element={<PatientForm />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />




    </Routes>
  )
}

export default App
