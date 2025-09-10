import React, { use, useState } from 'react'
import { Heart, UserCheck, Shield, ArrowRight, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null)
  const [hoveredRole, setHoveredRole] = useState(null)

    const navigate = useNavigate();

//   const handleRoleSelect = (role) => {
//     setSelectedRole(role)
//     // Add navigation logic here based on role
//     console.log(`Selected role: ${role}`)
//   }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2 fill-current" />
            Relive - Save Lives, Give Hope
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">Role</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Select how you'd like to participate in our life-saving mission. Every role is crucial in our ecosystem.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Donor Card */}
          <div
            
            className={`relative bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all duration-300 border group hover:shadow-2xl ${
              selectedRole === 'donor' ? 'border-red-600 ring-2 ring-red-200' : 'border-gray-100 hover:border-red-300'
            }`}
          >
            <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">Recommended</div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Become a Donor</h3>
              <p className="text-gray-600 mb-6">Save lives by registering as an organ donor. Your decision can give someone a second chance.</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Organ donor registry</li>
                <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Living donation options</li>
                <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Secure medical profile</li>
              </ul>
              <button 
              onClick={() => navigate('/donor-form')}
              className="w-full font-semibold py-3 px-6 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition-colors flex items-center justify-center">
                Choose Donor <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Patient Card */}
          <div
            
            className={`bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all duration-300 border group hover:shadow-2xl ${
              selectedRole === 'patient' ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-100 hover:border-blue-300'
            }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">I Need Help</h3>
              <p className="text-gray-600 mb-6">Find matching donors and access medical support. We connect you with trusted hospitals.</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Request organ transplant</li>
                <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Priority matching</li>
                <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> 24/7 support</li>
              </ul>
              <button 
              onClick={() => navigate('/patient-form')}
              className="w-full font-semibold py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center">
                Choose Patient <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Admin Card */}
          <div
            // onMouseEnter={() => setHoveredRole('admin')}
            // onMouseLeave={() => setHoveredRole(null)}
            // onClick={() => handleRoleSelect('admin')}
            className={`bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all duration-300 border group hover:shadow-2xl ${
              selectedRole === 'admin' ? 'border-purple-600 ring-2 ring-purple-200' : 'border-gray-100 hover:border-purple-300'
            }`}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Admin</h3>
              <p className="text-gray-600 mb-6">Manage hospitals, verify donors, oversee matches, and maintain platform safety and compliance.</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Verify organizations</li>
                <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Approve matches</li>
                <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Monitor compliance</li>
              </ul>
              <button 
              onClick={() => navigate('/admin-dashboard')}
              className="w-full font-semibold py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center justify-center">
                Choose Admin <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button 
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
