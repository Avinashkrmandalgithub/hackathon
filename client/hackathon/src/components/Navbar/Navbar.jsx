import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import { Menu, X, Heart, User, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { UserProfileContext } from '../../context/UserProfileContext';

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/work", text: "How It Works" },
  { to: "/about", text: "About" },
  { to: "/contact", text: "Contact" }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, handleSignout } = useContext(AuthContext);
  const { userRole } = useContext(UserProfileContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await handleSignout();
    setMenuOpen(false);
  };

  // Function to determine the correct dashboard URL
  const getDashboardUrl = () => {
    // Check localStorage for completed profiles
    const donorProfile = localStorage.getItem('donorProfile');
    const patientProfile = localStorage.getItem('patientProfile');
    const adminProfile = localStorage.getItem('adminProfile');
    const savedRole = localStorage.getItem('userRole');

    // If user has completed admin profile, redirect to admin dashboard
    if (adminProfile && savedRole === 'admin') {
      return '/admin/dashboard';
    }
    // If user has completed donor profile, redirect to donor dashboard
    if (donorProfile && savedRole === 'donor') {
      return '/donor-dashboard';
    }
    // If user has completed patient profile, redirect to patient dashboard  
    if (patientProfile && savedRole === 'patient') {
      return '/patient-dashboard';
    }
    // Otherwise, redirect to role selection
    return '/role-selection';
  };

  const handleDashboardClick = () => {
    navigate(getDashboardUrl());
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link className="flex items-center space-x-3 group" to="/">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RELIVE</h1>
              <p className="text-xs text-gray-500 -mt-1">Organ Donation Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.text}
                to={link.to} 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {link.text}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-8">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Welcome, {user.fullName?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleDashboardClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="ml-4 w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden">
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-40">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.text}
                    to={link.to}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 px-3 py-2 text-gray-700">
                      <User className="w-5 h-5" />
                      <span className="font-medium">{user.fullName}</span>
                    </div>
                    <button
                      onClick={handleDashboardClick}
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center space-x-2 w-full text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/login" 
                      className="block w-full text-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block w-full bg-gradient-to-r from-blue-600 to-green-600 text-white text-center py-3 rounded-lg font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar