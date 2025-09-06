import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import DonorUpdateForm from '../components/Forms/DonorUpdateForm';

export default function DonorProfilePage() {
  const { user } = useContext(AuthContext);
  const { donorProfile, fetchDonorProfile, loading } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user && !donorProfile) {
        const profile = await fetchDonorProfile(user._id);
        setProfileData(profile);
      } else if (donorProfile) {
        setProfileData(donorProfile);
      }
    };

    loadProfile();
  }, [user, donorProfile, fetchDonorProfile]);

  const handleUpdateSuccess = (updatedData) => {
    setProfileData(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Donor Profile Found</h2>
            <p className="text-gray-600 mb-4">You haven't created a donor profile yet.</p>
            <button
              onClick={() => window.location.href = '/donor-form'}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Create Donor Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <DonorUpdateForm
            initialData={profileData}
            onSuccess={handleUpdateSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Donor Profile</h2>
              <p className="text-gray-600">View and manage your donor information</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Personal Information */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900 font-medium">{profileData.fullName || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Age</label>
                <p className="text-gray-900 font-medium">{profileData.age || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <p className="text-gray-900 font-medium capitalize">{profileData.gender || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Blood Type</label>
                <p className="text-gray-900 font-medium">{profileData.bloodType || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900 font-medium">{profileData.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">City</label>
                <p className="text-gray-900 font-medium">{profileData.city || 'Not provided'}</p>
              </div>
              {profileData.state && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">State</label>
                  <p className="text-gray-900 font-medium">{profileData.state}</p>
                </div>
              )}
              {profileData.zipCode && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Zip Code</label>
                  <p className="text-gray-900 font-medium">{profileData.zipCode}</p>
                </div>
              )}
              {profileData.occupation && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Occupation</label>
                  <p className="text-gray-900 font-medium">{profileData.occupation}</p>
                </div>
              )}
            </div>
            {profileData.address && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-900 font-medium">{profileData.address}</p>
              </div>
            )}
          </div>

          {/* Medical Information */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Weight</label>
                <p className="text-gray-900 font-medium">{profileData.weight ? `${profileData.weight} kg` : 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Height</label>
                <p className="text-gray-900 font-medium">{profileData.height ? `${profileData.height} cm` : 'Not provided'}</p>
              </div>
              {profileData.lastDonation && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Last Donation</label>
                  <p className="text-gray-900 font-medium">{new Date(profileData.lastDonation).toLocaleDateString()}</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {profileData.medicalHistory && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Medical History</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{profileData.medicalHistory}</p>
                </div>
              )}
              {profileData.currentMedications && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Current Medications</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{profileData.currentMedications}</p>
                </div>
              )}
              {profileData.allergies && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Allergies</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{profileData.allergies}</p>
                </div>
              )}
            </div>
          </div>

          {/* Organ Donation Preferences */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Organ Donation Preferences</h3>
            {profileData.organsToDonate && profileData.organsToDonate.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {profileData.organsToDonate.map(organ => (
                  <div key={organ} className="flex items-center space-x-2 bg-green-50 p-2 rounded-md">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-800 font-medium">{organ}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">No organs selected for donation</p>
            )}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${profileData.availableForEmergency ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className={`text-sm font-medium ${profileData.availableForEmergency ? 'text-green-700' : 'text-gray-500'}`}>
                {profileData.availableForEmergency ? 'Available for emergency donations' : 'Not available for emergency donations'}
              </span>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Contact Name</label>
                <p className="text-gray-900 font-medium">{profileData.emergencyContact || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Contact Phone</label>
                <p className="text-gray-900 font-medium">{profileData.emergencyPhone || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Profile Status */}
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-800 font-medium">Active Donor Profile</span>
            </div>
            <p className="text-green-700 text-sm mt-1">Your profile is active and visible to medical institutions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
