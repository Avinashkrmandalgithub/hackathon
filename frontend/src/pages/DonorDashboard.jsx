import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, User, FileText, LogOut, Edit3, Phone, MapPin, Plus, X } from "lucide-react";
import donorStore from "../store/donorStore";
import donorRequestStore from "../store/donorRequestStore";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const getDonorProfile = donorStore((state) => state.getDonorProfile);
  const logoutDonor = donorStore((state) => state.logoutDonor);
  const createDonorRequest = donorRequestStore((state) => state.createDonorRequest);
  
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestData, setRequestData] = useState({
    organType: '',
    bloodGroup: '',
    urgencyLevel: 'medium'
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getDonorProfile();
        console.log("Donor data:", data);
        setDonor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [getDonorProfile]);

  const handleCreateRequest = async () => {
    setRequestLoading(true);
    setRequestError(null);
    setRequestSuccess(null);
    
    try {
      const requestPayload = {
        organType: requestData.organType,
        bloodGroup: requestData.bloodGroup || donor?.bloodGroup,
        urgencyLevel: requestData.urgencyLevel,
        donor: donor?._id
      };
      
      await createDonorRequest(requestPayload);
      setRequestSuccess("Donation request submitted successfully!");
      setShowRequestModal(false);
      
      // Refresh donor data
      const updatedData = await getDonorProfile();
      setDonor(updatedData);
    } catch (err) {
      setRequestError(err.response?.data?.message || err.message);
    } finally {
      setRequestLoading(false);
    }
  };

  const organOptions = [
    'Heart', 'Liver', 'Kidneys', 'Lungs', 'Pancreas', 
    'Corneas', 'Bone Marrow', 'Skin', 'Heart Valves', 'Bone'
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical', color: 'text-red-600' }
  ];

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Create Donation Request</h3>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {requestError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {requestError}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organ Type</label>
                <select
                  value={requestData.organType}
                  onChange={(e) => setRequestData({...requestData, organType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Organ</option>
                  {organOptions.map(organ => (
                    <option key={organ} value={organ}>{organ}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  value={requestData.bloodGroup || donor?.bloodGroup}
                  onChange={(e) => setRequestData({...requestData, bloodGroup: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                <select
                  value={requestData.urgencyLevel}
                  onChange={(e) => setRequestData({...requestData, urgencyLevel: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {urgencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRequest}
                disabled={requestLoading || !requestData.organType}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              >
                {requestLoading ? 'Submitting...' : 'Create Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo and User Info */}
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 rounded-lg p-2 mr-3">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">OrganMatch</h2>
              <p className="text-sm text-gray-600">Donor</p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-medium text-gray-800">{donor?.user?.fullName || "Donor Name"}</h3>
            <p className="text-sm text-gray-500 mt-1">{donor?.bloodGroup || "Blood Type"}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          <button className="w-full flex items-center px-4 py-3 text-left bg-blue-500 text-white rounded-lg font-medium">
            Dashboard
          </button>
          <button 
            className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/donor-profile")}
          >
            <User className="w-5 h-5 mr-3" />
            Profile
          </button>
          <button 
            className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate("/donor-applications")}
          >
            <FileText className="w-5 h-5 mr-3" />
            Requests
          </button>
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t">
          <button 
            className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              logoutDonor();
              navigate("/");
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Status Messages */}
        {requestError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {requestError}
          </div>
        )}
        {requestSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {requestSuccess}
          </div>
        )}

        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {donor?.user?.fullName || "Donor"}!</h1>
          <p className="text-blue-100">Thank you for your commitment to saving lives through organ donation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Heart className="w-6 h-6 text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">Application Status</h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                donor?.isVerified 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {donor?.isVerified ? "Verified" : "Under Review"}
              </span>
            </div>
            
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: donor?.isVerified ? "100%" : "60%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {donor?.isVerified 
                  ? "Your application has been approved and is active in our system."
                  : "Medical team is currently reviewing your application."
                }
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Next Steps</h3>
              <p className="text-sm text-gray-600">
                {donor?.isVerified 
                  ? "You can now create donation requests and help save lives."
                  : "You will be contacted within 3-5 business days for the next steps."
                }
              </p>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Profile Summary</h2>
              <Edit3 
                className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={() => navigate("/donor-profile")} 
              />
            </div>

            <div className="space-y-4">
              <div className={`rounded-lg p-3 ${
                donor?.isVerified ? "bg-green-50" : "bg-yellow-50"
              }`}>
                <p className={`text-sm font-medium ${
                  donor?.isVerified ? "text-green-600" : "text-yellow-600"
                }`}>
                  {donor?.isVerified ? "VERIFIED DONOR" : "UNDER REVIEW"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium text-gray-800">{donor?.contactInfo?.phone || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-800">{donor?.contactInfo?.address || "Not provided"}</p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Blood Type</p>
                  <p className="font-medium text-gray-800">{donor?.bloodGroup || "Not specified"}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-800">{donor?.location || "Not specified"}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <button 
                className="flex items-center w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-2"
                onClick={() => navigate("/donor-profile")}
              >
                <Edit3 className="w-4 h-4 text-gray-600 mr-3" />
                <span className="text-gray-700">Update Profile</span>
              </button>
              
              {/* Request Button */}
              <button 
                className="flex items-center w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                onClick={() => setShowRequestModal(true)}
                disabled={!donor?.isVerified}
              >
                <Plus className="w-4 h-4 text-white mr-3" />
                <span className="text-white">
                  Create Donation Request
                </span>
              </button>
              {!donor?.isVerified && (
                <p className="text-xs text-gray-500 mt-2">
                  Your account must be verified before you can create requests.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Donation Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Donation Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Blood Type */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full mr-2"></div>
                <h3 className="font-semibold text-gray-800">Blood Type</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">{donor?.bloodGroup || "N/A"}</p>
              <p className="text-sm text-gray-600 mt-1">Available for donation</p>
            </div>

            {/* Age */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <User className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Age</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">{donor?.age || "N/A"}</p>
              <p className="text-sm text-gray-600 mt-1">Years</p>
            </div>

            {/* Gender */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <h3 className="font-semibold text-gray-800">Gender</h3>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {donor?.gender ? donor.gender.charAt(0).toUpperCase() + donor.gender.slice(1) : "N/A"}
              </p>
            </div>

            {/* Physical Stats */}
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <h3 className="font-semibold text-gray-800">Physical Stats</h3>
              </div>
              <p className="text-sm text-gray-600">Height: {donor?.height || "N/A"} cm</p>
              <p className="text-sm text-gray-600">Weight: {donor?.weight || "N/A"} kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;