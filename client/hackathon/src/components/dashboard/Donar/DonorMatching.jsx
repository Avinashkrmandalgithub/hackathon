import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/Card.jsx';
import { Button } from '../../ui/Button.jsx';
import { 
  Heart, 
  MapPin, 
  Clock, 
  Droplet, 
  AlertTriangle, 
  Star, 
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Activity
} from 'lucide-react';

export default function DonorMatching({ donorProfile }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    urgency: 'all',
    organ: 'all',
    location: 'all',
    bloodType: 'all'
  });

  // Mock data for demonstration - in real app this would come from API
  const mockMatches = [
    {
      id: '1',
      patientName: 'Sarah Chen',
      age: 34,
      gender: 'Female',
      bloodType: donorProfile.bloodType,
      requiredOrgan: 'Kidney',
      urgency: 'Emergency',
      location: donorProfile.city,
      distance: '2.3 km',
      matchScore: 98,
      waitingTime: '8 months',
      hospital: 'City Medical Center',
      medicalCondition: 'Chronic kidney disease stage 5',
      requiredBy: '2025-09-15',
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      patientName: 'Michael Rodriguez',
      age: 28,
      gender: 'Male',
      bloodType: donorProfile.bloodType,
      requiredOrgan: 'Liver',
      urgency: 'Urgent',
      location: donorProfile.city,
      distance: '5.7 km',
      matchScore: 94,
      waitingTime: '4 months',
      hospital: 'General Hospital',
      medicalCondition: 'Hepatitis B complications',
      requiredBy: '2025-10-01',
      lastActivity: '1 day ago'
    },
    {
      id: '3',
      patientName: 'Emily Johnson',
      age: 42,
      gender: 'Female',
      bloodType: donorProfile.bloodType,
      requiredOrgan: 'Corneas',
      urgency: 'Normal',
      location: `${donorProfile.city} Area`,
      distance: '12.1 km',
      matchScore: 89,
      waitingTime: '2 months',
      hospital: 'Eye Care Institute',
      medicalCondition: 'Corneal dystrophy',
      requiredBy: '2025-11-30',
      lastActivity: '3 days ago'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch matches
    setLoading(true);
    setTimeout(() => {
      // Filter matches based on donor's available organs
      const compatibleMatches = mockMatches.filter(match => 
        donorProfile.organsToDonate && donorProfile.organsToDonate.includes(match.requiredOrgan)
      );
      setMatches(compatibleMatches);
      setLoading(false);
    }, 1000);
  }, [donorProfile.organsToDonate]);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Emergency': return 'bg-red-100 text-red-700 border-red-200';
      case 'Urgent': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Normal': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const handleContactPatient = (patientId) => {
    // Implementation for contacting patient
    alert(`Initiating contact with patient ID: ${patientId}`);
  };

  const handleExpressInterest = (patientId) => {
    // Implementation for expressing interest
    alert(`Interest expressed for patient ID: ${patientId}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <p className="ml-4 text-gray-600">Finding compatible patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-green-600 flex items-center gap-2">
              <Heart className="w-6 h-6"/> Compatible Patients
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Activity className="w-4 h-4"/>
              {matches.length} matches found
            </div>
          </div>
          
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <select 
              className="p-2 border border-gray-300 rounded-md text-sm"
              value={searchFilters.urgency}
              onChange={(e) => setSearchFilters({...searchFilters, urgency: e.target.value})}
            >
              <option value="all">All Urgencies</option>
              <option value="Emergency">Emergency</option>
              <option value="Urgent">Urgent</option>
              <option value="Normal">Normal</option>
            </select>
            <select 
              className="p-2 border border-gray-300 rounded-md text-sm"
              value={searchFilters.organ}
              onChange={(e) => setSearchFilters({...searchFilters, organ: e.target.value})}
            >
              <option value="all">All Organs</option>
              {donorProfile.organsToDonate?.map(organ => (
                <option key={organ} value={organ}>{organ}</option>
              ))}
            </select>
            <select className="p-2 border border-gray-300 rounded-md text-sm">
              <option>Distance: All</option>
              <option>Within 5km</option>
              <option>Within 10km</option>
              <option>Within 25km</option>
            </select>
            <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">
              <Filter className="w-4 h-4 mr-2"/> Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient Matches */}
      <div className="grid grid-cols-1 gap-6">
        {matches.length === 0 ? (
          <Card className="shadow-md">
            <CardContent className="p-8 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4"/>
              <p className="text-gray-500 text-lg">No compatible patients found at the moment.</p>
              <p className="text-gray-400 text-sm mt-2">We'll notify you when new matches become available.</p>
            </CardContent>
          </Card>
        ) : (
          matches.map(match => (
            <Card key={match.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-blue-600"/>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{match.patientName}</h3>
                      <p className="text-gray-600">{match.age} years old, {match.gender}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(match.urgency)}`}>
                      {match.urgency}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className={`w-4 h-4 ${getMatchScoreColor(match.matchScore)}`}/>
                      <span className={`font-medium ${getMatchScoreColor(match.matchScore)}`}>
                        {match.matchScore}% Match
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">Medical Details</h4>
                    <p className="text-sm"><Droplet className="w-4 h-4 inline mr-2 text-red-500"/><strong>Blood Type:</strong> {match.bloodType}</p>
                    <p className="text-sm"><Heart className="w-4 h-4 inline mr-2 text-red-500"/><strong>Required:</strong> {match.requiredOrgan}</p>
                    <p className="text-sm"><Activity className="w-4 h-4 inline mr-2 text-blue-500"/><strong>Condition:</strong> {match.medicalCondition}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">Timeline & Location</h4>
                    <p className="text-sm"><MapPin className="w-4 h-4 inline mr-2 text-green-500"/><strong>Location:</strong> {match.location}</p>
                    <p className="text-sm"><Clock className="w-4 h-4 inline mr-2 text-blue-500"/><strong>Waiting:</strong> {match.waitingTime}</p>
                    <p className="text-sm"><Calendar className="w-4 h-4 inline mr-2 text-orange-500"/><strong>Required by:</strong> {new Date(match.requiredBy).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">Healthcare</h4>
                    <p className="text-sm"><strong>Hospital:</strong> {match.hospital}</p>
                    <p className="text-sm"><strong>Distance:</strong> {match.distance}</p>
                    <p className="text-sm text-gray-500"><strong>Last Active:</strong> {match.lastActivity}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleExpressInterest(match.id)}
                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  >
                    <Heart className="w-4 h-4 mr-2"/>
                    Express Interest
                  </Button>
                  <Button 
                    onClick={() => handleContactPatient(match.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2"/>
                    Contact Hospital
                  </Button>
                  <Button className="border border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Mail className="w-4 h-4 mr-2"/>
                    More Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
