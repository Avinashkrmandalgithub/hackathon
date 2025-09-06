import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaUserInjured } from 'react-icons/fa';

export default function RoleSelection() {
  const navigate = useNavigate();
  const [existingProfile, setExistingProfile] = useState(null);
  
  useEffect(() => {
    // Check for existing profiles
    const donorProfile = localStorage.getItem('donorProfile');
    const patientProfile = localStorage.getItem('patientProfile');
    const userRole = localStorage.getItem('userRole');
    
    if (donorProfile && userRole === 'donor') {
      setExistingProfile('donor');
    } else if (patientProfile && userRole === 'patient') {
      setExistingProfile('patient');
    }
  }, []);
  
  const handleRoleClick = (role) => {
    if (existingProfile && existingProfile !== role) {
      alert(`You already have a ${existingProfile} profile. Each user can only have one profile type. Please logout and create a new account if you need a different role.`);
      return;
    }
    
    if (existingProfile === role) {
      // User already has this profile, redirect to dashboard
      navigate(role === 'donor' ? '/donor-dashboard' : '/patient-dashboard');
      return;
    }
    
    // No existing profile, proceed to form
    navigate(role === 'donor' ? '/donor-form' : '/patient-form');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full max-w-2xl px-6 py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-gray-600">
            How would you like to contribute to saving lives?
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Donor Card */}
          <div 
            onClick={() => handleRoleClick('donor')}
            className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 ${
              existingProfile === 'donor' 
                ? 'border-green-500 bg-green-50' 
                : existingProfile 
                  ? 'border-gray-300 opacity-75 cursor-not-allowed' 
                  : 'border-transparent hover:border-green-500'
            }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-3xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Become a Donor
              </h3>
              <p className="text-gray-600 mb-6">
                Save lives by donating organs or blood. Your generosity can give someone a second chance at life.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>✓ Register as an organ donor</p>
                <p>✓ Schedule blood donations</p>
                <p>✓ Track your donation history</p>
              </div>
              <button className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                existingProfile === 'donor'
                  ? 'bg-green-600 text-white'
                  : existingProfile
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
              }`}>
                {existingProfile === 'donor' ? 'Go to Dashboard' : existingProfile ? 'Already Registered' : 'Choose Donor'}
              </button>
            </div>
          </div>

          {/* Patient Card */}
          <div 
            onClick={() => handleRoleClick('patient')}
            className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 ${
              existingProfile === 'patient' 
                ? 'border-blue-500 bg-blue-50' 
                : existingProfile 
                  ? 'border-gray-300 opacity-75 cursor-not-allowed' 
                  : 'border-transparent hover:border-blue-500'
            }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserInjured className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                I Need Help
              </h3>
              <p className="text-gray-600 mb-6">
                Find matching donors and get the medical help you need. We're here to connect you with life-saving resources.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>✓ Request organ transplants</p>
                <p>✓ Find blood donors</p>
                <p>✓ Track your requests</p>
              </div>
              <button className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                existingProfile === 'patient'
                  ? 'bg-blue-600 text-white'
                  : existingProfile
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}>
                {existingProfile === 'patient' ? 'Go to Dashboard' : existingProfile ? 'Already Registered' : 'Choose Patient'}
              </button>
            </div>
          </div>

        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
