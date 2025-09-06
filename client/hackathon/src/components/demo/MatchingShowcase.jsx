import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { 
  Heart, 
  MapPin, 
  User, 
  Activity, 
  Droplet, 
  Shield,
  Phone,
  Mail,
  Star,
  Zap,
  CheckCircle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function MatchingShowcase() {
  const [selectedView, setSelectedView] = useState('overview');

  const mockPatientProfile = {
    fullName: "Sarah Johnson",
    bloodType: "A+",
    requiredOrgans: ["Heart", "Liver"],
    city: "San Francisco",
    urgencyLevel: "Urgent",
    age: 42,
    _id: "demo-patient-1"
  };

  const mockMatches = [
    {
      id: '1',
      donorName: 'Michael Rodriguez',
      age: 32,
      gender: 'Male',
      bloodType: 'A+',
      availableOrgans: ['Heart', 'Liver', 'Kidney'],
      location: 'San Francisco',
      distance: '2.1 km',
      matchScore: 98,
      status: 'Available',
      emergencyAvailable: true,
      medicalCompatibility: 'Excellent',
      registeredSince: '2023-03-10',
      lastActive: '30 minutes ago'
    },
    {
      id: '2', 
      donorName: 'Jennifer Chen',
      age: 28,
      gender: 'Female',
      bloodType: 'A+',
      availableOrgans: ['Heart', 'Cornea'],
      location: 'San Francisco Bay Area',
      distance: '5.7 km',
      matchScore: 95,
      status: 'Available',
      emergencyAvailable: false,
      medicalCompatibility: 'Excellent',
      registeredSince: '2023-01-15',
      lastActive: '2 hours ago'
    },
    {
      id: '3',
      donorName: 'David Kim',
      age: 35,
      gender: 'Male', 
      bloodType: 'A+',
      availableOrgans: ['Liver', 'Kidney'],
      location: 'Oakland',
      distance: '12.3 km',
      matchScore: 91,
      status: 'Available',
      emergencyAvailable: true,
      medicalCompatibility: 'Very Good',
      registeredSince: '2022-11-20',
      lastActive: '6 hours ago'
    }
  ];

  const stats = {
    totalMatches: mockMatches.length,
    availableNow: mockMatches.filter(m => m.status === 'Available').length,
    nearbyDonors: mockMatches.filter(m => parseFloat(m.distance) <= 10).length,
    avgCompatibility: Math.round(mockMatches.reduce((acc, m) => acc + m.matchScore, 0) / mockMatches.length)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl shadow-lg mb-6">
            <Heart className="w-10 h-10 text-white"/>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enhanced Patient Matching Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the new modern interface for finding compatible organ donors with advanced filtering, 
            real-time updates, and intuitive design.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedView('overview')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedView === 'overview' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Overview Stats
              </button>
              <button
                onClick={() => setSelectedView('matches')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedView === 'matches' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Donor Matches
              </button>
              <button
                onClick={() => setSelectedView('features')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedView === 'features' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                New Features
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Patient Info Card */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white"/>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{mockPatientProfile.fullName}</h2>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                        <Droplet className="w-4 h-4 mr-1"/>
                        {mockPatientProfile.bloodType}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium">
                        {mockPatientProfile.urgencyLevel} Priority
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        <MapPin className="w-4 h-4 mr-1"/>
                        {mockPatientProfile.city}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Required Organs</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockPatientProfile.requiredOrgans.map(organ => (
                      <span key={organ} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {organ}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-blue-600"/>
                    </div>
                    <span className="text-3xl font-bold text-blue-600">{stats.totalMatches}</span>
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-1">Total Matches</h3>
                  <p className="text-gray-500 text-sm">Compatible donors found</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600"/>
                    </div>
                    <span className="text-3xl font-bold text-green-600">{stats.availableNow}</span>
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-1">Available Now</h3>
                  <p className="text-gray-500 text-sm">Ready for contact</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-yellow-600"/>
                    </div>
                    <span className="text-3xl font-bold text-yellow-600">{stats.nearbyDonors}</span>
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-1">Nearby</h3>
                  <p className="text-gray-500 text-sm">Within 25km radius</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600"/>
                    </div>
                    <span className="text-3xl font-bold text-purple-600">{stats.avgCompatibility}%</span>
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-1">Avg. Match</h3>
                  <p className="text-gray-500 text-sm">Compatibility score</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedView === 'matches' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Compatible Donors</h2>
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">Live Matching</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {mockMatches.map((match, index) => (
                <Card key={match.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {match.donorName.charAt(0)}
                          </div>
                          {match.status === 'Available' && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{match.donorName}</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                              <MapPin className="w-4 h-4 mr-1"/>
                              {match.location} • {match.distance}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                              <Droplet className="w-4 h-4 mr-1"/>
                              {match.bloodType}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              match.status === 'Available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {match.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="relative w-20 h-20">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="2"
                            />
                            <path
                              d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                              fill="none"
                              stroke={match.matchScore >= 95 ? '#10b981' : '#3b82f6'}
                              strokeWidth="2"
                              strokeDasharray={`${match.matchScore}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-900">{match.matchScore}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Compatibility</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <Heart className="w-5 h-5 text-blue-600"/>
                          <h4 className="text-sm font-semibold text-blue-900">Available Organs</h4>
                        </div>
                        <p className="text-blue-800 font-medium">{match.availableOrgans.join(', ')}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <User className="w-5 h-5 text-green-600"/>
                          <h4 className="text-sm font-semibold text-green-900">Donor Info</h4>
                        </div>
                        <p className="text-green-800 font-medium">{match.age} yrs, {match.gender}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <Shield className="w-5 h-5 text-purple-600"/>
                          <h4 className="text-sm font-semibold text-purple-900">Compatibility</h4>
                        </div>
                        <p className="text-purple-800 font-medium">{match.medicalCompatibility}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <Activity className="w-5 h-5 text-yellow-600"/>
                          <h4 className="text-sm font-semibold text-yellow-900">Emergency Ready</h4>
                        </div>
                        <p className="text-yellow-800 font-medium">
                          {match.emergencyAvailable ? 'Yes, 24/7' : 'Scheduled only'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                        <Heart className="w-5 h-5 mr-2"/>
                        Send Match Request
                      </Button>
                      <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                        <Phone className="w-5 h-5 mr-2"/>
                        Contact Donor
                      </Button>
                      <Button variant="outline" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold px-6 py-3 rounded-xl transition-all duration-200">
                        <User className="w-5 h-5 mr-2"/>
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'features' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">New Features & Improvements</h2>
              <p className="text-xl text-gray-600">Enhanced user experience with modern design and powerful functionality</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Activity className="w-8 h-8 text-blue-600"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Matching</h3>
                  <p className="text-gray-600">Live updates when new compatible donors become available in your area.</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-green-600"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Compatibility</h3>
                  <p className="text-gray-600">Enhanced matching algorithm considers medical history, genetics, and lifestyle factors.</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-purple-600"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Location Intelligence</h3>
                  <p className="text-gray-600">Smart geographic matching with distance optimization and emergency routing.</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-yellow-600"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Emergency Priority</h3>
                  <p className="text-gray-600">24/7 emergency donor availability with instant notification system.</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-red-600"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Communications</h3>
                  <p className="text-gray-600">Automated messaging, request tracking, and response management.</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star className="w-8 h-8 text-indigo-600"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Modern UI/UX</h3>
                  <p className="text-gray-600">Intuitive design with accessibility features and mobile-first approach.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience the New Dashboard?</h2>
            <p className="text-xl opacity-90 mb-8">Join thousands of patients already using our enhanced matching system.</p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg">
              Get Started <ArrowRight className="w-5 h-5 ml-2"/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
