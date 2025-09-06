import React, { useState, useContext } from 'react';
import { useUserProfile } from '../../context/UserProfileContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { runFullAuthDebug } from '../../utils/authDebug';

const AdminForm = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { saveAdminProfile, loading } = useUserProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: 'admin',
    gender: '',
    phone: '',
    address: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [showCredentials, setShowCredentials] = useState(null);

  // Check authentication first
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🔐 Authentication Required</h2>
              <p className="text-gray-600 mb-6">You must be logged in as a regular user before creating an admin profile.</p>
              <div className="space-y-3">
                <button 
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button 
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors" 
                  onClick={() => navigate('/signup')}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const runDebugTests = async () => {
    console.log('🔍 Running authentication debug tests...');
    await runFullAuthDebug();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Run debug test before submission
    console.log('🔍 Pre-submission debug test:');
    await runFullAuthDebug();

    const result = await saveAdminProfile(formData);
    
    if (result.success) {
      console.log('✅ Admin profile created successfully:', result.data);
      
      // Show credentials to user
      setShowCredentials({
        username: result.data.credentials.username,
        password: result.data.credentials.password
      });

      // Clear form
      setFormData({
        role: 'admin',
        gender: '',
        phone: '',
        address: '',
        location: ''
      });
      
    } else {
      console.error('❌ Failed to create admin profile:', result.error);
      setErrors({ submit: result.error });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Show success screen with credentials
  if (showCredentials) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-600 mb-2">🎉 Admin Profile Created Successfully!</h2>
              <p className="text-gray-600">Welcome, <strong>{user.fullName}</strong>!</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🔑 Your Admin Credentials</h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Username:</label>
                  <code className="bg-gray-200 p-2 rounded text-gray-800 font-mono">{showCredentials.username}</code>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Password:</label>
                  <code className="bg-gray-200 p-2 rounded text-gray-800 font-mono">{showCredentials.password}</code>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Important:</strong> Save these credentials securely. You'll need them to access the admin panel.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                onClick={() => navigate('/admin/login')}
              >
                Go to Admin Login
              </button>
              <button 
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                onClick={() => navigate('/admin/dashboard')}
              >
                Admin Dashboard
              </button>
              <button 
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                onClick={() => setShowCredentials(null)}
              >
                Create Another Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">👨‍💼 Create Admin Profile</h2>
            <p className="text-gray-600">
              Creating admin profile for: <strong>{user.email}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{errors.submit}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Admin Role *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-offset-2 ${errors.role ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                required
              >
                <option value="admin">System Admin</option>
                <option value="hospital">Hospital Admin</option>
                <option value="medical">Medical Admin</option>
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-offset-2 ${errors.gender ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1234567890"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-offset-2 ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                required
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your full address"
                rows="3"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-offset-2 ${errors.address ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                required
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State/Province"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-offset-2 ${errors.location ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`}
                required
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            <button 
              type="submit" 
              className={`w-full py-3 px-4 rounded-md text-white font-medium focus:ring-2 focus:ring-offset-2 transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Admin Profile...
                </>
              ) : (
                'Create Admin Profile'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              ℹ️ Admin credentials will be automatically generated after profile creation.
            </p>
          </div>
          
          {/* Debug Button - Remove in production */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-700 mb-2">🔧 Debug Tools:</p>
            <button
              type="button"
              onClick={runDebugTests}
              className="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
            >
              Test Authentication Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
