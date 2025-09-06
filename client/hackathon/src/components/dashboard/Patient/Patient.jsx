import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../ui/Card.jsx";
import { Button } from "../../ui/Button.jsx";
import { 
  Bell, User, Droplet, MapPin, Heart, Eye, Brain, Settings, FileText, Users, Phone, Clock, Activity, ArrowLeft,
  Calendar, ChevronRight, AlertTriangle, CheckCircle2, Stethoscope, Pill, UserCheck, 
  TrendingUp, Timer, Shield, Zap, Award, Hospital
} from "lucide-react";
import { useUserProfile } from '../../../context/UserProfileContext';
import { AuthContext } from '../../../context/AuthContext';
import PatientMatching from './PatientMatching.jsx';
import QuickMatch from './QuickMatch.jsx';

export default function Patient() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { patientProfile, fetchPatientProfile, loading } = useUserProfile();
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'matching'

  useEffect(() => {
    if (user && !patientProfile) {
      fetchPatientProfile(user._id);
    }
  }, [user, patientProfile, fetchPatientProfile]);

  const handleUpdateProfile = () => {
    navigate("/patient-profile");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!patientProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No patient profile found. Please complete your profile setup.</p>
          <button 
            onClick={() => navigate('/patient-form')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  };

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
        
        {/* Patient Matching Component */}
        <PatientMatching patientProfile={patientProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {patientProfile.fullName?.split(' ')[0] || user?.fullName?.split(' ')[0]}!</h1>
                <p className="text-gray-600">Your health journey continues here</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative cursor-pointer">
                <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">2</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
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
                <p className="text-sm font-medium text-gray-600">Treatment Status</p>
                <p className="text-2xl font-bold text-blue-600">
                  {patientProfile.urgencyLevel === 'Emergency' ? 'Critical' :
                   patientProfile.urgencyLevel === 'Urgent' ? 'Urgent' :
                   patientProfile.urgencyLevel === 'Normal' ? 'Stable' : 'Active'}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                patientProfile.urgencyLevel === 'Emergency' ? 'bg-red-100' :
                patientProfile.urgencyLevel === 'Urgent' ? 'bg-orange-100' :
                patientProfile.urgencyLevel === 'Normal' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                <AlertTriangle className={`w-6 h-6 ${
                  patientProfile.urgencyLevel === 'Emergency' ? 'text-red-600' :
                  patientProfile.urgencyLevel === 'Urgent' ? 'text-orange-600' :
                  patientProfile.urgencyLevel === 'Normal' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>Under care</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days on List</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.floor((new Date() - new Date(patientProfile.createdAt)) / (1000 * 60 * 60 * 24))}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <Timer className="w-4 h-4 mr-1" />
              <span>Waiting period</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Potential Matches</p>
                <p className="text-2xl font-bold text-purple-600">7</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600">
              <Heart className="w-4 h-4 mr-1" />
              <span>Available donors</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Appointment</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Days away</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Patient Profile & Medical Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Patient Profile</h2>
                    <p className="opacity-90">Your medical information</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${
                      patientProfile.urgencyLevel === 'Emergency' ? 'bg-red-300' :
                      patientProfile.urgencyLevel === 'Urgent' ? 'bg-orange-300' :
                      'bg-blue-300'
                    }`}></div>
                    <span className="text-sm font-medium">{patientProfile.urgencyLevel || 'Active'}</span>
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
                        <p className="font-semibold text-gray-900">{patientProfile.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Droplet className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Blood Type</p>
                        <p className="font-semibold text-gray-900">{patientProfile.bloodType}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="font-semibold text-gray-900">{patientProfile.age} years</p>
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
                        <p className="font-semibold text-gray-900">{patientProfile.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Hospital className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hospital</p>
                        <p className="font-semibold text-gray-900">{patientProfile.hospitalName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Registered</p>
                        <p className="font-semibold text-gray-900">{new Date(patientProfile.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Requirements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Medical Requirements</h3>
                  <p className="text-sm text-gray-600">What you need for treatment</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  patientProfile.urgencyLevel === 'Emergency' ? 'bg-red-100 text-red-700' :
                  patientProfile.urgencyLevel === 'Urgent' ? 'bg-orange-100 text-orange-700' :
                  patientProfile.urgencyLevel === 'Normal' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {patientProfile.urgencyLevel || 'Normal'} Priority
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Required Organs</h4>
                  <div className="space-y-3">
                    {patientProfile.requiredOrgans && patientProfile.requiredOrgans.length > 0 ? (
                      patientProfile.requiredOrgans.map(organ => (
                        <div key={organ} className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Heart className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{organ}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-gray-600">No specific organs required</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Blood Requirements</h4>
                  <div className="space-y-3">
                    {patientProfile.requiredBloodType && (
                      <div className="p-3 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-200 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                          <Droplet className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{patientProfile.requiredBloodType}</span>
                      </div>
                    )}
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Required By</span>
                        <span className="font-medium text-gray-900">
                          {patientProfile.requiredBy ? new Date(patientProfile.requiredBy).toLocaleDateString() : 'Not specified'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {patientProfile.medicalCondition && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Stethoscope className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Medical Condition</h4>
                      <p className="text-sm text-blue-700 mt-1">{patientProfile.medicalCondition}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Healthcare Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Healthcare Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Healthcare Team</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor</span>
                      <span className="font-medium text-gray-900">{patientProfile.doctorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone</span>
                      <span className="font-medium text-gray-900">{patientProfile.doctorPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hospital</span>
                      <span className="font-medium text-gray-900">{patientProfile.hospitalName}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Physical Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Height</span>
                      <span className="font-medium text-gray-900">{patientProfile.height} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-medium text-gray-900">{patientProfile.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">BMI</span>
                      <span className="font-medium text-gray-900">
                        {patientProfile.weight && patientProfile.height ? (patientProfile.weight / Math.pow(patientProfile.height/100, 2)).toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Emergency Contact</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Contact Person</p>
                      <p className="text-sm font-medium text-gray-900">{patientProfile.emergencyContact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{patientProfile.emergencyPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Relationship</p>
                      <p className="text-sm font-medium text-gray-900">{patientProfile.emergencyRelation}</p>
                    </div>
                    {patientProfile.insuranceProvider && (
                      <div>
                        <p className="text-sm text-gray-600">Insurance</p>
                        <p className="text-sm font-medium text-gray-900">{patientProfile.insuranceProvider}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {patientProfile.currentMedications && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-start space-x-3">
                    <Pill className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Current Medications</h4>
                      <p className="text-sm text-green-700 mt-1">{patientProfile.currentMedications}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Match & Actions */}
          <div className="space-y-6">
            {/* Quick Match Section */}
            <QuickMatch 
              patientProfile={patientProfile} 
              onViewFullMatches={() => setCurrentView('matching')}
            />
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleUpdateProfile}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Update Profile</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView('matching')}
                  className="w-full flex items-center justify-between p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all border border-green-200"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Find Donors</span>
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
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Appointments</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Medical Updates & Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Recent Updates</h3>
                </div>
                <span className="text-sm text-gray-500">2 new</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-green-800">Doctor's Appointment</span>
                        <span className="px-2 py-1 bg-green-200 text-green-700 text-xs rounded-full font-medium">Completed</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">Regular checkup with Dr. {patientProfile.doctorName} - Blood work results normal.</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{patientProfile.hospitalName}</span>
                        <span>Yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-blue-800">Medication Update</span>
                        <span className="px-2 py-1 bg-blue-200 text-blue-700 text-xs rounded-full font-medium">New</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">Updated immunosuppressant prescription - Please collect from pharmacy.</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Dr. {patientProfile.doctorName}</span>
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-orange-800">Upcoming Appointment</span>
                        <span className="px-2 py-1 bg-orange-200 text-orange-700 text-xs rounded-full font-medium">Scheduled</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">Follow-up consultation scheduled for next week.</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{patientProfile.hospitalName}</span>
                        <span>In 3 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 font-medium py-2">
                View All Updates
              </button>
            </div>

            {/* Support & Emergency */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-sm border border-red-200 p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Contact</h3>
                <p className="text-sm text-gray-600 mb-4">24/7 medical support for urgent situations. Don't hesitate to reach out.</p>
                <div className="space-y-2">
                  <button className="w-full bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-colors font-medium">
                    Emergency Hotline
                  </button>
                  <button className="w-full bg-white text-red-500 border border-red-500 py-3 px-4 rounded-xl hover:bg-red-50 transition-colors font-medium">
                    Contact Doctor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}