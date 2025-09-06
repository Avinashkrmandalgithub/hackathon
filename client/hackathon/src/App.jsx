import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Donar from './components/dashboard/donar/Donar.jsx'
import ProfileUpdate from './components/dashboard/donar/ProfileUpdate.jsx'
import { DonarProvider } from './context/DonarContext'
import { AuthProvider, AuthContext } from './context/AuthContext.jsx'
import { UserProfileProvider } from './context/UserProfileContext.jsx'
import Patient from './components/dashboard/Patient/Patient.jsx'
import HowItWorks from './components/Work/Work.jsx'
import Contact from './components/Contact.jsx'
import RoleSelection from './components/RoleSelection/RoleSelection.jsx'
import DonorForm from './components/Forms/DonorForm.jsx'
import PatientForm from './components/Forms/PatientForm.jsx'
import AdminForm from './components/Forms/AdminForm.jsx'
import DonorProfilePage from './pages/DonorProfilePage.jsx'
import PatientProfilePage from './pages/PatientProfilePage.jsx'
import Unauthorized from './pages/Unauthorized.jsx'

// Admin Components
import AdminLogin from './components/dashboard/Admin/AdminLogin.jsx'
import AdminDashboard from './components/dashboard/Admin/AdminDashboard.jsx'
import RequestManagement from './components/dashboard/Admin/RequestManagement.jsx'
import UserManagement from './components/dashboard/Admin/UserManagement.jsx'
import AdminDemo from './components/demo/AdminDemo.jsx'
import { 
  ProtectedRoute, 
  ProfileProtectedRoute, 
  PublicRoute, 
  LoadingRoute,
  AdminProtectedRoute 
} from './components/ProtectedRoute.jsx'


// Component to handle routes with authentication context
function AppRoutes() {
  const { loading } = useContext(AuthContext);

  return (
    <LoadingRoute isLoading={loading}>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/work' element={<HowItWorks/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/unauthorized' element={<Unauthorized/>}/>
        
        {/* Auth Routes (redirect if already logged in) */}
        <Route path='/signup' element={<PublicRoute><SignUp/></PublicRoute>}/>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        
        {/* Protected Routes - Require Authentication */}
        <Route path='/role-selection' element={
          <ProtectedRoute>
            <RoleSelection/>
          </ProtectedRoute>
        }/>
        
        <Route path='/donor-form' element={
          <ProtectedRoute>
            <DonorForm/>
          </ProtectedRoute>
        }/>
        
        <Route path='/patient-form' element={
          <ProtectedRoute>
            <PatientForm/>
          </ProtectedRoute>
        }/>
        
        <Route path='/admin/register' element={
          <ProtectedRoute>
            <AdminForm/>
          </ProtectedRoute>
        }/>

        {/* Dashboard Routes - Require Authentication + Profile */}
        <Route path='/donor-dashboard' element={
          <ProfileProtectedRoute userType="donor">
            <Donar/>
          </ProfileProtectedRoute>
        }/>
        
        <Route path='/patient-dashboard' element={
          <ProfileProtectedRoute userType="patient">
            <Patient/>
          </ProfileProtectedRoute>
        }/>
        
        {/* Profile Routes - Require Authentication + Profile */}
        <Route path='/donor-profile' element={
          <ProfileProtectedRoute userType="donor">
            <DonorProfilePage/>
          </ProfileProtectedRoute>
        }/>
        
        <Route path='/patient-profile' element={
          <ProfileProtectedRoute userType="patient">
            <PatientProfilePage/>
          </ProfileProtectedRoute>
        }/>
        
        {/* Legacy routes - keeping for compatibility */}
        <Route path='/donar' element={
          <ProfileProtectedRoute userType="donor">
            <Donar/>
          </ProfileProtectedRoute>
        }/>
        
        <Route path='/donar/update-profile' element={
          <ProfileProtectedRoute userType="donor">
            <ProfileUpdate/>
          </ProfileProtectedRoute>
        }/>
        
        <Route path='/patient' element={
          <ProfileProtectedRoute userType="patient">
            <Patient/>
          </ProfileProtectedRoute>
        }/>
        
        {/* Admin Routes */}
        <Route path='/admin/demo' element={<AdminDemo/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={
          <AdminProtectedRoute>
            <AdminDashboard/>
          </AdminProtectedRoute>
        }/>
        <Route path='/admin/requests' element={
          <AdminProtectedRoute>
            <RequestManagement/>
          </AdminProtectedRoute>
        }/>
        <Route path='/admin/users' element={
          <AdminProtectedRoute>
            <UserManagement/>
          </AdminProtectedRoute>
        }/>
      </Routes>
    </LoadingRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <DonarProvider>
          <AppRoutes />
        </DonarProvider>
      </UserProfileProvider>
    </AuthProvider>
  )
}

export default App
