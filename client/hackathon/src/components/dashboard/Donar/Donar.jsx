import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../ui/Card.jsx";
import { Button } from "../../ui/Button.jsx";
import { Switch } from "../../ui/Switch.jsx";
import { 
  Bell, User, Droplet, MapPin, Heart, Eye, Brain, Settings, FileText, Users, Phone, Clock, ArrowLeft,
  Activity, Award, Calendar, ChevronRight, Gift, Handshake, BarChart3, TrendingUp, 
  UserCheck, AlertCircle, CheckCircle2, Star, Shield, Zap
} from "lucide-react";
import { useUserProfile } from '../../../context/UserProfileContext';
import { AuthContext } from '../../../context/AuthContext';
import DonorMatching from './DonorMatching.jsx';

export default function Donar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { donorProfile, fetchDonorProfile, loading } = useUserProfile();
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'matching'

  useEffect(() => {
    if (user && !donorProfile) {
      fetchDonorProfile(user._id);
    }
  }, [user, donorProfile, fetchDonorProfile]);

  const handleUpdateProfile = () => {
    navigate("/donor-profile");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!donorProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No donor profile found. Please complete your profile setup.</p>
          <button 
            onClick={() => navigate('/donor-form')}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  // Show matching view if selected
  if (currentView === 'matching') {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setCurrentView('dashboard')}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2"/> Back to Dashboard
          </Button>
        </div>
        
        {/* Donor Matching Component */}
        <DonorMatching donorProfile={donorProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {donorProfile.fullName?.split(' ')[0] || user?.fullName?.split(' ')[0]}!</h1>
                <p className="text-gray-600">Thank you for being a life-saving hero</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative cursor-pointer">
                <Bell className="w-6 h-6 text-gray-600 hover:text-green-600 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">3</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Donation Status</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Ready to help</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lives Impacted</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <Star className="w-4 h-4 mr-1" />
              <span>Amazing impact</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Match Requests</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>Pending review</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-purple-600">2hrs</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Very fast</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Donation Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Donor Profile</h2>
                    <p className="opacity-90">Your information at a glance</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Active</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-semibold text-gray-900">{donorProfile.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Droplet className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Blood Type</p>
                        <p className="font-semibold text-gray-900">{donorProfile.bloodType}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="font-semibold text-gray-900">{donorProfile.age} years</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{donorProfile.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-semibold text-gray-900">{donorProfile.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-semibold text-gray-900">{new Date(donorProfile.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Organs to Donate */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Available for Donation</h3>
                  <p className="text-sm text-gray-600">Organs you're willing to donate</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {donorProfile.organsToDonate && donorProfile.organsToDonate.length > 0 ? (
                  donorProfile.organsToDonate.map(organ => (
                    <div key={organ} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{organ}</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full p-8 bg-gray-50 rounded-xl border border-gray-200 text-center">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No organs selected for donation</p>
                    <button className="mt-3 text-green-600 font-medium hover:text-green-700">Add organs</button>
                  </div>
                )}
              </div>
              {donorProfile.availableForEmergency && (
                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-orange-500" />
                    <span className="font-medium text-orange-800">Emergency Donations Available</span>
                  </div>
                  <p className="text-sm text-orange-700 mt-1">You're available for urgent cases that require immediate assistance.</p>
                </div>
              )}
            </div>

            {/* Medical Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Medical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Physical Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Height</span>
                      <span className="font-medium text-gray-900">{donorProfile.height} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-medium text-gray-900">{donorProfile.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">BMI</span>
                      <span className="font-medium text-gray-900">
                        {donorProfile.weight && donorProfile.height ? (donorProfile.weight / Math.pow(donorProfile.height/100, 2)).toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Medical History</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">History</p>
                      <p className="text-sm font-medium text-gray-900">{donorProfile.medicalHistory || 'No history provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Medications</p>
                      <p className="text-sm font-medium text-gray-900">{donorProfile.currentMedications || 'None reported'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Emergency Contact</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Contact Person</p>
                      <p className="text-sm font-medium text-gray-900">{donorProfile.emergencyContact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="text-sm font-medium text-gray-900">{donorProfile.emergencyPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Notifications */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleUpdateProfile}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Update Profile</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView('matching')}
                  className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all border border-blue-200"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Find Recipients</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-all">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Medical Records</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-all">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5" />
                    <span className="font-medium">Donation History</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Recent Activity & Notifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <span className="text-sm text-gray-500">3 new</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-red-800">Urgent Match Request</span>
                        <span className="px-2 py-1 bg-red-200 text-red-700 text-xs rounded-full font-medium">High Priority</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">Kidney donation needed for 45-year-old patient. Compatible blood type match.</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>St. Mary's Hospital, San Francisco</span>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-yellow-800">Potential Match Found</span>
                        <span className="px-2 py-1 bg-yellow-200 text-yellow-700 text-xs rounded-full font-medium">Medium Priority</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">Your cornea donation could help restore sight for a 28-year-old teacher.</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Oakland Medical Center</span>
                        <span>5 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-green-800">Hospital Inquiry</span>
                        <span className="px-2 py-1 bg-green-200 text-green-700 text-xs rounded-full font-medium">Low Priority</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">Liver transplant candidate seeking compatible donor in Bay Area.</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>General Hospital, San Jose</span>
                        <span>1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 text-center text-green-600 hover:text-green-700 font-medium py-2">
                View All Notifications
              </button>
            </div>

            {/* Support & Help */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-200 p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Support?</h3>
                <p className="text-sm text-gray-600 mb-4">Our team is here to help you with any questions about the donation process.</p>
                <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors font-medium">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

