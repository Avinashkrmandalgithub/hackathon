import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Basic Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Role-based Protected Route Component
export const RoleProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role (if specified)
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to unauthorized page or home
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Profile-based Protected Route (requires profile completion)
export const ProfileProtectedRoute = ({ children, userType }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has completed profile setup
  const hasProfile = userType === 'donor' 
    ? localStorage.getItem('donorProfile') 
    : localStorage.getItem('patientProfile');

  if (!hasProfile) {
    // Redirect to profile setup
    const redirectPath = userType === 'donor' ? '/donor-form' : '/patient-form';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// Public Route (redirects authenticated users away from login/signup)
export const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    // Redirect authenticated users to dashboard or home
    return <Navigate to="/role-selection" replace />;
  }

  return children;
};

// Admin Protected Route (specifically for admin authentication)
export const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Check if admin is logged in (stored in localStorage after admin login)
  const adminData = localStorage.getItem('adminData');
  
  if (!adminData) {
    // Redirect to admin login page
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  try {
    // Verify admin data is valid JSON
    const admin = JSON.parse(adminData);
    if (!admin || !admin.admin || !admin.accessToken) {
      // Invalid admin data, redirect to login
      localStorage.removeItem('adminData');
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  } catch (error) {
    // Invalid JSON, redirect to login
    localStorage.removeItem('adminData');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Loading Route (shows while checking authentication)
export const LoadingRoute = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return children;
};
