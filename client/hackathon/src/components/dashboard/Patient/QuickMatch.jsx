import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/Card.jsx';
import { Button } from '../../ui/Button.jsx';
import { 
  Heart, 
  Users, 
  Star, 
  MapPin, 
  Clock, 
  Droplet,
  ChevronRight,
  Zap,
  AlertCircle,
  CheckCircle,
  Loader2,
  Phone,
  Mail,
  Eye
} from 'lucide-react';

export default function QuickMatch({ patientProfile, onViewFullMatches }) {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuickMatchData();
  }, [patientProfile._id]);

  const fetchQuickMatchData = async () => {
    try {
      setLoading(true);
      // Using mock patient ID for now
      const response = await fetch(`http://localhost:8000/api/v1/matching/patient/${patientProfile._id || 1}/summary`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch match data');
      }
      
      const result = await response.json();
      setMatchData(result.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching quick match data:', err);
      setError(err.message);
      // Fallback to mock data
      setMatchData({
        totalMatches: 7,
        excellentMatches: 2,
        goodMatches: 3,
        fairMatches: 2,
        emergencyAvailable: 4,
        nearbyDonors: 5,
        recentActivity: [
          {
            type: "new_donor",
            message: "New compatible donor registered in your area",
            time: "2 hours ago",
            priority: "high"
          },
          {
            type: "location_match",
            message: "2 new donors found within 10km of your location",
            time: "1 day ago", 
            priority: "medium"
          }
        ],
        topMatches: [
          {
            id: 1,
            name: "John S.",
            matchScore: 96,
            bloodType: patientProfile.bloodType || "O+",
            distance: "2.1 km",
            status: "Available",
            emergencyAvailable: true
          },
          {
            id: 2,
            name: "Maria G.",
            matchScore: 92,
            bloodType: patientProfile.bloodType || "A+", 
            distance: "4.5 km",
            status: "Available",
            emergencyAvailable: false
          }
        ]
      });
    } finally {
      setLoading(false);
    }
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
          message: "I am interested in your organ donation. Please consider my request.",
          urgency: patientProfile.urgencyLevel || "normal"
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      alert('Request sent successfully! The donor will be notified.');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request. Please try again.');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    return 'text-orange-600';
  };

  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-3 text-gray-600">Finding your matches...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !matchData) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">Unable to load match data</p>
            <Button onClick={fetchQuickMatchData} className="bg-red-500 hover:bg-red-600 text-white">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Quick Match</h3>
            </div>
            <Button 
              onClick={onViewFullMatches}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-7"
            >
              View All <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-green-600">{matchData?.totalMatches || 0}</div>
              <div className="text-xs text-green-700 font-medium leading-tight">Total<br/>Matches</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-blue-600">{matchData?.excellentMatches || 0}</div>
              <div className="text-xs text-blue-700 font-medium">Excellent</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-orange-600">{matchData?.emergencyAvailable || 0}</div>
              <div className="text-xs text-orange-700 font-medium leading-tight">Emergency<br/>Available</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-purple-600">{matchData?.nearbyDonors || 0}</div>
              <div className="text-xs text-purple-700 font-medium leading-tight">Within<br/>50km</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Matches */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              Top Matches
            </h4>
            <span className="text-xs text-gray-500">Best compatibility</span>
          </div>

          <div className="space-y-3">
            {matchData?.topMatches?.map((match, index) => (
              <div key={match.id} className="relative bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden">
                {/* Rank Badge */}
                <div className={`absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
                  index === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                }`}>
                  #{index + 1}
                </div>
                
                {/* Status Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  match.status === 'Available' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                }`}>
                  {match.status}
                </div>
                
                {/* Emergency Badge */}
                {match.emergencyAvailable && (
                  <div className="absolute top-2 right-20 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Zap className="w-3 h-3 mr-1" />
                    Emergency
                  </div>
                )}
                
                <div className="p-4 pt-12">
                  {/* Name and Score */}
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-lg font-bold text-gray-900">{match.name}</h5>
                    <div className={`flex items-center space-x-1 ${getMatchScoreColor(match.matchScore)} bg-white rounded-full px-3 py-1 border-2 ${
                      match.matchScore >= 95 ? 'border-green-200' :
                      match.matchScore >= 85 ? 'border-blue-200' : 'border-orange-200'
                    }`}>
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-sm">{match.matchScore}%</span>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center text-sm font-medium">
                      <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                        <Droplet className="w-3 h-3 text-red-500" />
                      </div>
                      <span className="text-gray-800">{match.bloodType}</span>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <MapPin className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-gray-800">{match.distance}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleSendRequest(match.id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Request
                    </Button>
                    <Button className="px-4 py-2 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-all duration-200 hover:shadow-md">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center">
              <Clock className="w-4 h-4 text-gray-500 mr-2" />
              Recent Activity
            </h4>
            <span className="text-xs text-gray-500">{matchData?.recentActivity?.length || 0} updates</span>
          </div>
          <div className="space-y-2">
            {matchData?.recentActivity?.map((activity, index) => (
              <div key={index} className={`p-2 rounded-lg border ${getPriorityColor(activity.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium leading-relaxed pr-2">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs opacity-75">{activity.time}</p>
                      <div className="flex-shrink-0">
                        {activity.priority === 'high' ? (
                          <AlertCircle className="w-3 h-3" />
                        ) : (
                          <CheckCircle className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
