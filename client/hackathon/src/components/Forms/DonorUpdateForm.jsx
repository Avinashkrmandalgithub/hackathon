import React, { useState, useEffect } from 'react';
import { useUserProfile } from '../../context/UserProfileContext';

export default function DonorUpdateForm({ initialData, onSuccess, onCancel }) {
  const { updateDonorProfile, loading: profileLoading } = useUserProfile();
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    age: '',
    gender: '',
    bloodType: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Medical Information
    weight: '',
    height: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    lastDonation: '',
    
    // Organ Donation
    organsToDonate: [],
    availableForEmergency: false,
    
    // Additional Info
    occupation: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [loading, setLoading] = useState(false);

  // Pre-populate form with initial data
  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        age: initialData.age || '',
        gender: initialData.gender || '',
        bloodType: initialData.bloodType || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        zipCode: initialData.zipCode || '',
        weight: initialData.weight || '',
        height: initialData.height || '',
        medicalHistory: initialData.medicalHistory || '',
        currentMedications: initialData.currentMedications || '',
        allergies: initialData.allergies || '',
        lastDonation: initialData.lastDonation || '',
        organsToDonate: initialData.organsToDonate || [],
        availableForEmergency: initialData.availableForEmergency || false,
        occupation: initialData.occupation || '',
        emergencyContact: initialData.emergencyContact || '',
        emergencyPhone: initialData.emergencyPhone || ''
      });
    }
  }, [initialData]);

  const organOptions = [
    'Heart', 'Liver', 'Kidneys', 'Lungs', 'Pancreas', 'Corneas', 
    'Bone Marrow', 'Skin', 'Heart Valves', 'Bone'
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'organsToDonate') {
      setFormData(prev => ({
        ...prev,
        organsToDonate: checked 
          ? [...prev.organsToDonate, value]
          : prev.organsToDonate.filter(organ => organ !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await updateDonorProfile(formData);
      
      if (result.success) {
        console.log('✅ Donor profile updated successfully');
        onSuccess && onSuccess(result.data);
      } else {
        console.error('❌ Failed to update donor profile:', result.error);
        alert(`Failed to update profile: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Update Donor Profile
        </h2>
        <p className="text-gray-600">
          Update your donor information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Information */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="18"
                max="65"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Blood Type</option>
                {bloodTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Medical Information */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Donation Date</label>
              <input
                type="date"
                name="lastDonation"
                value={formData.lastDonation}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                rows="3"
                placeholder="Any past medical conditions, surgeries, etc."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
              <textarea
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleInputChange}
                rows="2"
                placeholder="List all current medications"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                rows="2"
                placeholder="List any allergies"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* Organ Donation */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Organ Donation Preferences</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {organOptions.map(organ => (
              <label key={organ} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="organsToDonate"
                  value={organ}
                  checked={formData.organsToDonate.includes(organ)}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">{organ}</span>
              </label>
            ))}
          </div>
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="availableForEmergency"
                checked={formData.availableForEmergency}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Available for emergency donations</span>
            </label>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || profileLoading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading || profileLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
