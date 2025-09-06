import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import PatientUpdateForm from '../components/Forms/PatientUpdateForm';

export default function PatientProfilePage() {
  const { user } = useContext(AuthContext);
  const { patientProfile, fetchPatientProfile, loading } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user && !patientProfile) {
        const profile = await fetchPatientProfile(user._id);
        setProfileData(profile);
      } else if (patientProfile) {
        setProfileData(patientProfile);
      }
    };

    loadProfile();
  }, [user, patientProfile, fetchPatientProfile]);

  const handleUpdateSuccess = (updatedData) => {
    setProfileData(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'Emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'Urgent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Normal': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Patient Profile Found</h2>
            <p className="text-gray-600 mb-4">You haven't created a patient profile yet.</p>
            <button
              onClick={() => window.location.href = '/patient-form'}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Create Patient Profile
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
          <PatientUpdateForm
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Profile</h2>
              <p className="text-gray-600">View and manage your patient information</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center space-x-2"
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
              <div>
                <label className="block text-sm font-medium text-gray-500">Doctor Name</label>
                <p className="text-gray-900 font-medium">{profileData.doctorName || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Doctor Phone</label>
                <p className="text-gray-900 font-medium">{profileData.doctorPhone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Hospital</label>
                <p className="text-gray-900 font-medium">{profileData.hospitalName || 'Not provided'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {profileData.medicalCondition && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Medical Condition</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{profileData.medicalCondition}</p>
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
              {profileData.medicalHistory && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Medical History</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{profileData.medicalHistory}</p>
                </div>
              )}
            </div>
          </div>

          {/* Required Donations */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Donations</h3>
            
            {/* Required Organs */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-500 mb-2">Required Organs</label>
              {profileData.requiredOrgans && profileData.requiredOrgans.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {profileData.requiredOrgans.map(organ => (
                    <div key={organ} className="flex items-center space-x-2 bg-blue-50 p-2 rounded-md">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-blue-800 font-medium">{organ}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No organs required</p>
              )}
            </div>

            {/* Priority and Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profileData.requiredBloodType && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Required Blood Type</label>
                  <p className="text-gray-900 font-medium">{profileData.requiredBloodType}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-500">Urgency Level</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(profileData.urgencyLevel)}`}>
                  {profileData.urgencyLevel || 'Not specified'}
                </span>
              </div>
              {profileData.requiredBy && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Required By</label>
                  <p className="text-gray-900 font-medium">{new Date(profileData.requiredBy).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Insurance Information */}
          {(profileData.insuranceProvider || profileData.insuranceNumber) && (
            <div className="border-b pb-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileData.insuranceProvider && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Insurance Provider</label>
                    <p className="text-gray-900 font-medium">{profileData.insuranceProvider}</p>
                  </div>
                )}
                {profileData.insuranceNumber && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Insurance Number</label>
                    <p className="text-gray-900 font-medium">{profileData.insuranceNumber}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Contact Name</label>
                <p className="text-gray-900 font-medium">{profileData.emergencyContact || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Contact Phone</label>
                <p className="text-gray-900 font-medium">{profileData.emergencyPhone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Relation</label>
                <p className="text-gray-900 font-medium capitalize">{profileData.emergencyRelation || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Profile Status */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-800 font-medium">Active Patient Profile</span>
            </div>
            <p className="text-blue-700 text-sm mt-1">Your profile is active and being matched with potential donors.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
