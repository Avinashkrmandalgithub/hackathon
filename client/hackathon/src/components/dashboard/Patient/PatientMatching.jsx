import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/Card.jsx';
import { Button } from '../../ui/Button.jsx';
import { 
  Heart, 
  MapPin, 
  Clock, 
  Droplet, 
  Star, 
  Filter,
  Phone,
  Mail,
  Calendar,
  Activity,
  Shield,
  CheckCircle,
  User
} from 'lucide-react';

export default function PatientMatching({ patientProfile }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    organ: 'all',
    location: 'all',
    bloodType: 'all',
    availability: 'all'
  });

  // Mock data for demonstration - in real app this would come from API
  const mockMatches = [
    {
      id: '1',
      donorName: 'John Smith',
      age: 29,
      gender: 'Male',
      bloodType: patientProfile.bloodType,
      availableOrgans: patientProfile.requiredOrgans || [],
      location: patientProfile.city,
      distance: '1.8 km',
      matchScore: 96,
      lastDonation: 'Never',
      status: 'Available',
      emergencyAvailable: true,
      medicalCompatibility: 'Excellent',
      registeredSince: '2023-01-15',
      lastActive: '1 hour ago'
    },
    {
      id: '2',
      donorName: 'Maria Garcia',
      age: 35,
      gender: 'Female',
      bloodType: patientProfile.bloodType,
      availableOrgans: patientProfile.requiredOrgans || [],
      location: `${patientProfile.city} Area`,
      distance: '4.2 km',
      matchScore: 92,
      lastDonation: 'Blood - 6 months ago',
      status: 'Available',
      emergencyAvailable: false,
      medicalCompatibility: 'Very Good',
      registeredSince: '2022-08-20',
      lastActive: '3 hours ago'
    },
    {
      id: '3',
      donorName: 'David Chen',
      age: 41,
      gender: 'Male',
      bloodType: patientProfile.bloodType,
      availableOrgans: patientProfile.requiredOrgans || [],
      location: `${patientProfile.city} Metro`,
      distance: '8.7 km',
      matchScore: 88,
      lastDonation: 'Never',
      status: 'Available',
      emergencyAvailable: true,
      medicalCompatibility: 'Good',
      registeredSince: '2023-06-10',
      lastActive: '1 day ago'
    }
  ];

  useEffect(() => {
    fetchMatches();
  }, [patientProfile._id, searchFilters]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        organ: searchFilters.organ,
        bloodType: searchFilters.bloodType,
        location: searchFilters.location,
        availability: searchFilters.availability
      });
      
      const response = await fetch(`http://localhost:8000/api/v1/matching/patient/${patientProfile._id || 1}/donors?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }
      
      const result = await response.json();
      setMatches(result.data || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
      // Fallback to mock data on error
      const compatibleMatches = mockMatches.filter(match => 
        patientProfile.requiredOrgans && 
        match.availableOrgans.some(organ => patientProfile.requiredOrgans.includes(organ))
      );
      setMatches(compatibleMatches);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Busy': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Unavailable': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getCompatibilityColor = (compatibility) => {
    switch (compatibility) {
      case 'Excellent': return 'text-green-600';
      case 'Very Good': return 'text-blue-600';
      case 'Good': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const handleContactDonor = (donorId) => {
    // Implementation for contacting donor
    alert(`Initiating contact with donor ID: ${donorId}`);
  };

  const handleSendRequest = async (donorId) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/matching/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorId: donorId,
          patientId: patientProfile._id || 1,
          message: "I would like to request your consideration for organ donation. Please review my case.",
          urgency: patientProfile.urgencyLevel || "normal"
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      const result = await response.json();
      alert(`Donation request sent successfully! Expected response time: ${result.data.estimatedResponseTime}`);
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Finding compatible donors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white"/>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  Compatible Donors
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-green-100">
                    <Activity className="w-4 h-4 text-blue-600 mr-2"/>
                    <span className="text-sm font-semibold text-blue-700">{matches.length} found</span>
                  </div>
                </h1>
                <p className="text-gray-600 mt-1">Find your perfect donor match with advanced filtering</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">Live Matching</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Advanced Filters */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-500"/>
                Advanced Filters
              </h3>
              <div className="text-sm text-gray-500">Refine your search for better matches</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Required Organ</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                  value={searchFilters.organ}
                  onChange={(e) => setSearchFilters({...searchFilters, organ: e.target.value})}
                >
                  <option value="all">All Organs</option>
                  {patientProfile.requiredOrgans?.map(organ => (
                    <option key={organ} value={organ}>{organ}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Blood Type</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                  value={searchFilters.bloodType}
                  onChange={(e) => setSearchFilters({...searchFilters, bloodType: e.target.value})}
                >
                  <option value="all">Any Blood Type</option>
                  <option value={patientProfile.bloodType}>Exact Match ({patientProfile.bloodType})</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Distance Range</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                  value={searchFilters.location}
                  onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                >
                  <option value="all">Distance: All</option>
                  <option value="5km">Within 5km</option>
                  <option value="10km">Within 10km</option>
                  <option value="25km">Within 25km</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={fetchMatches}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Filter className="w-5 h-5 mr-2"/> Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600"/>
              </div>
              <span className="text-3xl font-bold text-blue-600">{matches.length}</span>
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">Total Matches</h3>
            <p className="text-gray-500 text-sm">Compatible donors found</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600"/>
              </div>
              <span className="text-3xl font-bold text-green-600">{matches.filter(m => m.status === 'Available').length}</span>
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">Available Now</h3>
            <p className="text-gray-500 text-sm">Ready for contact</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-yellow-600"/>
              </div>
              <span className="text-3xl font-bold text-yellow-600">{matches.filter(m => parseFloat(m.distance) <= 25).length}</span>
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">Nearby</h3>
            <p className="text-gray-500 text-sm">Within 25km radius</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600"/>
              </div>
              <span className="text-3xl font-bold text-purple-600">
                {matches.length > 0 ? Math.round(matches.reduce((acc, m) => acc + m.matchScore, 0) / matches.length) : 0}%
              </span>
            </div>
            <h3 className="text-gray-900 font-semibold mb-1">Avg. Match</h3>
            <p className="text-gray-500 text-sm">Compatibility score</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
            <div className="flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-white animate-pulse"/>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">Searching for compatible donors...</h3>
                  <p className="text-gray-500">This may take a few moments while we find the best matches</p>
                </div>
                <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Donor Matches */}
        {!loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Compatible Donors</h2>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sort by Compatibility</option>
                  <option>Sort by Distance</option>
                  <option>Sort by Availability</option>
                  <option>Sort by Recent Activity</option>
                </select>
              </div>
            </div>
            
            {matches.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-gray-400"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find more compatible donors</p>
                <Button 
                  onClick={fetchMatches}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold px-8 py-3 rounded-xl"
                >
                  Search Again
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {matches.map((match, index) => (
                  <div key={match.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                              {match.donorName?.charAt(0) || 'D'}
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
                        
                        {/* Compatibility Score */}
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
                                stroke={match.matchScore >= 90 ? '#10b981' : match.matchScore >= 75 ? '#3b82f6' : '#f59e0b'}
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

                      {/* Medical Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <Heart className="w-5 h-5 text-blue-600"/>
                            <h4 className="text-sm font-semibold text-blue-900">Available Organs</h4>
                          </div>
                          <p className="text-blue-800 font-medium">{match.availableOrgans?.join(', ')}</p>
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
                          <p className={`font-medium ${getCompatibilityColor(match.medicalCompatibility)}`}>
                            {match.medicalCompatibility}
                          </p>
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

                      {/* Additional Details */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Last Donation:</span>
                            <span className="ml-2 font-medium">{match.lastDonation}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Member Since:</span>
                            <span className="ml-2 font-medium">{new Date(match.registeredSince).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Last Active:</span>
                            <span className="ml-2 font-medium">{match.lastActive}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <Button 
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                          onClick={() => handleSendRequest(match.id)}
                        >
                          <Heart className="w-5 h-5 mr-2"/>
                          Send Match Request
                        </Button>
                        <Button 
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                          onClick={() => handleContactDonor(match.id)}
                        >
                          <Phone className="w-5 h-5 mr-2"/>
                          Contact Donor
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                        >
                          <User className="w-5 h-5 mr-2"/>
                          View Full Profile
                        </Button>
                        <Button 
                          variant="outline"
                          className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                        >
                          <Mail className="w-5 h-5 mr-2"/>
                          Save Match
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
