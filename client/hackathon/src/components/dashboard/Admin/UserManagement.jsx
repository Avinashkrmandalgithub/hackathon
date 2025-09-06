import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/Card.jsx';
import { Button } from '../../ui/Button.jsx';
import AdminNavigation from './AdminNavigation.jsx';
import {
  Users,
  Heart,
  UserCheck,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Droplet,
  Building2,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  UserPlus,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('registrationDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedUser, setExpandedUser] = useState(null);

  // Mock data for all registered users
  const mockUsers = [
    // Donors
    {
      id: 'D001',
      type: 'donor',
      user: {
        _id: 'user001',
        fullName: 'Michael Rodriguez',
        email: 'michael.rodriguez@email.com',
        phone: '+1 (555) 123-4567',
        createdAt: '2024-01-10T10:30:00Z'
      },
      profile: {
        age: 32,
        gender: 'Male',
        bloodType: 'O+',
        weight: 75,
        height: 178,
        location: 'San Francisco, CA',
        availableOrgans: ['Kidney', 'Liver'],
        medicalHistory: 'No significant medical history',
        lifestyle: 'Active, non-smoker, occasional alcohol',
        emergencyContact: 'Maria Rodriguez - Wife',
        emergencyPhone: '+1 (555) 123-4568',
        donationHistory: [],
        isActive: true,
        lastActive: '2024-01-15T14:20:00Z',
        verificationStatus: 'verified',
        registrationDate: '2024-01-10T10:30:00Z'
      }
    },
    {
      id: 'D002',
      type: 'donor',
      user: {
        _id: 'user002',
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 234-5678',
        createdAt: '2024-01-08T15:45:00Z'
      },
      profile: {
        age: 28,
        gender: 'Female',
        bloodType: 'A+',
        weight: 62,
        height: 165,
        location: 'Oakland, CA',
        availableOrgans: ['Kidney', 'Cornea'],
        medicalHistory: 'Healthy, regular checkups',
        lifestyle: 'Vegetarian, fitness enthusiast',
        emergencyContact: 'John Johnson - Husband',
        emergencyPhone: '+1 (555) 234-5679',
        donationHistory: ['Blood donation - 2023'],
        isActive: true,
        lastActive: '2024-01-14T09:15:00Z',
        verificationStatus: 'verified',
        registrationDate: '2024-01-08T15:45:00Z'
      }
    },
    {
      id: 'D003',
      type: 'donor',
      user: {
        _id: 'user003',
        fullName: 'David Chen',
        email: 'david.chen@email.com',
        phone: '+1 (555) 345-6789',
        createdAt: '2024-01-05T12:20:00Z'
      },
      profile: {
        age: 35,
        gender: 'Male',
        bloodType: 'B+',
        weight: 82,
        height: 180,
        location: 'San Jose, CA',
        availableOrgans: ['Liver'],
        medicalHistory: 'Previous minor surgery - 2018',
        lifestyle: 'Moderate exercise, social drinker',
        emergencyContact: 'Lisa Chen - Wife',
        emergencyPhone: '+1 (555) 345-6790',
        donationHistory: [],
        isActive: true,
        lastActive: '2024-01-13T16:30:00Z',
        verificationStatus: 'pending',
        registrationDate: '2024-01-05T12:20:00Z'
      }
    },
    // Patients
    {
      id: 'P001',
      type: 'patient',
      user: {
        _id: 'user004',
        fullName: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        phone: '+1 (555) 456-7890',
        createdAt: '2024-01-12T08:30:00Z'
      },
      profile: {
        age: 28,
        gender: 'Female',
        bloodType: 'A+',
        weight: 58,
        height: 162,
        location: 'Berkeley, CA',
        requiredOrgans: ['Heart'],
        medicalCondition: 'Cardiomyopathy diagnosed 2021',
        urgencyLevel: 'Critical',
        hospitalName: 'UCSF Medical Center',
        doctorName: 'Dr. James Chen',
        doctorPhone: '+1 (555) 200-1000',
        insuranceProvider: 'Blue Shield',
        emergencyContact: 'Robert Wilson - Father',
        emergencyPhone: '+1 (555) 456-7891',
        requiredBy: '2024-02-15T00:00:00Z',
        isActive: true,
        lastActive: '2024-01-15T11:45:00Z',
        verificationStatus: 'verified',
        registrationDate: '2024-01-12T08:30:00Z',
        waitingListPosition: 3
      }
    },
    {
      id: 'P002',
      type: 'patient',
      user: {
        _id: 'user005',
        fullName: 'Robert Johnson',
        email: 'robert.johnson@email.com',
        phone: '+1 (555) 567-8901',
        createdAt: '2024-01-09T14:15:00Z'
      },
      profile: {
        age: 45,
        gender: 'Male',
        bloodType: 'AB-',
        weight: 78,
        height: 175,
        location: 'Palo Alto, CA',
        requiredOrgans: ['Kidney'],
        medicalCondition: 'Chronic kidney disease stage 4',
        urgencyLevel: 'High',
        hospitalName: 'Stanford Medical Center',
        doctorName: 'Dr. Maria Rodriguez',
        doctorPhone: '+1 (555) 300-2000',
        insuranceProvider: 'Kaiser Permanente',
        emergencyContact: 'Jennifer Johnson - Wife',
        emergencyPhone: '+1 (555) 567-8902',
        requiredBy: '2024-03-01T00:00:00Z',
        isActive: true,
        lastActive: '2024-01-14T13:20:00Z',
        verificationStatus: 'verified',
        registrationDate: '2024-01-09T14:15:00Z',
        waitingListPosition: 7
      }
    },
    {
      id: 'P003',
      type: 'patient',
      user: {
        _id: 'user006',
        fullName: 'Lisa Martinez',
        email: 'lisa.martinez@email.com',
        phone: '+1 (555) 678-9012',
        createdAt: '2024-01-07T11:00:00Z'
      },
      profile: {
        age: 39,
        gender: 'Female',
        bloodType: 'O-',
        weight: 65,
        height: 168,
        location: 'San Francisco, CA',
        requiredOrgans: ['Liver'],
        medicalCondition: 'Liver cirrhosis - advanced stage',
        urgencyLevel: 'High',
        hospitalName: 'UCSF Medical Center',
        doctorName: 'Dr. Kevin Wong',
        doctorPhone: '+1 (555) 200-1001',
        insuranceProvider: 'Aetna',
        emergencyContact: 'Carlos Martinez - Husband',
        emergencyPhone: '+1 (555) 678-9013',
        requiredBy: '2024-02-28T00:00:00Z',
        isActive: true,
        lastActive: '2024-01-15T10:30:00Z',
        verificationStatus: 'verified',
        registrationDate: '2024-01-07T11:00:00Z',
        waitingListPosition: 2
      }
    }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, activeTab, searchQuery, selectedFilter, sortBy, sortOrder]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // In production, you would call both APIs:
      // const donorsResponse = await fetch('http://localhost:8000/api/v1/donor/all');
      // const patientsResponse = await fetch('http://localhost:8000/api/v1/patient/all');
      
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Fallback to mock data
      setUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = users;

    // Filter by tab
    if (activeTab !== 'all') {
      if (activeTab === 'donors') {
        filtered = filtered.filter(user => user.type === 'donor');
      } else if (activeTab === 'patients') {
        filtered = filtered.filter(user => user.type === 'patient');
      } else if (activeTab === 'verified') {
        filtered = filtered.filter(user => user.profile.verificationStatus === 'verified');
      } else if (activeTab === 'pending') {
        filtered = filtered.filter(user => user.profile.verificationStatus === 'pending');
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.profile.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'active') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filtered = filtered.filter(user => new Date(user.profile.lastActive) > oneWeekAgo);
      } else if (selectedFilter === 'critical' && activeTab === 'patients') {
        filtered = filtered.filter(user => user.profile.urgencyLevel === 'Critical');
      } else if (selectedFilter === 'new') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filtered = filtered.filter(user => new Date(user.profile.registrationDate) > oneMonthAgo);
      }
    }

    // Sort users
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'registrationDate':
          aValue = new Date(a.profile.registrationDate);
          bValue = new Date(b.profile.registrationDate);
          break;
        case 'name':
          aValue = a.user.fullName;
          bValue = b.user.fullName;
          break;
        case 'lastActive':
          aValue = new Date(a.profile.lastActive);
          bValue = new Date(b.profile.lastActive);
          break;
        case 'urgency':
          const urgencyOrder = { Critical: 4, High: 3, Normal: 2, Low: 1 };
          aValue = urgencyOrder[a.profile.urgencyLevel] || 0;
          bValue = urgencyOrder[b.profile.urgencyLevel] || 0;
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });

    setFilteredUsers(filtered);
  };

  const getVerificationStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-500 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Normal':
        return 'bg-blue-500 text-white';
      case 'Low':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getUserTypeIcon = (type) => {
    return type === 'donor' ? 
      <Heart className="w-4 h-4 text-green-500" /> : 
      <UserCheck className="w-4 h-4 text-blue-500" />;
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Admin Navigation */}
        <AdminNavigation className="mb-6" />

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage all registered donors and patients</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Users
              </Button>
              <Button onClick={fetchUsers} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Users</p>
                  <p className="text-2xl font-bold text-blue-700">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Donors</p>
                  <p className="text-2xl font-bold text-green-700">
                    {users.filter(u => u.type === 'donor').length}
                  </p>
                </div>
                <Heart className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Patients</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {users.filter(u => u.type === 'patient').length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Verified</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {users.filter(u => u.profile.verificationStatus === 'verified').length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
            {[
              { key: 'all', label: 'All Users', count: users.length },
              { key: 'donors', label: 'Donors', count: users.filter(u => u.type === 'donor').length },
              { key: 'patients', label: 'Patients', count: users.filter(u => u.type === 'patient').length },
              { key: 'verified', label: 'Verified', count: users.filter(u => u.profile.verificationStatus === 'verified').length },
              { key: 'pending', label: 'Pending', count: users.filter(u => u.profile.verificationStatus === 'pending').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Options */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active (Last 7 days)</option>
              <option value="new">New (Last 30 days)</option>
              {activeTab === 'patients' && <option value="critical">Critical Patients</option>}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="registrationDate">Registration Date</option>
              <option value="name">Name</option>
              <option value="lastActive">Last Active</option>
              {activeTab === 'patients' && <option value="urgency">Urgency Level</option>}
            </select>

            {/* Sort Order */}
            <Button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              variant="outline"
              className="flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
            </Button>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.id} className="shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  {/* User Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getUserTypeIcon(user.type)}
                        <span className="font-semibold text-gray-900">{user.id}</span>
                        {getVerificationIcon(user.profile.verificationStatus)}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getVerificationStatusColor(user.profile.verificationStatus)}`}>
                          {user.profile.verificationStatus.toUpperCase()}
                        </span>
                        {user.type === 'patient' && user.profile.urgencyLevel && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(user.profile.urgencyLevel)}`}>
                            {user.profile.urgencyLevel.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {expandedUser === user.id ? 'Less' : 'Details'}
                        {expandedUser === user.id ? 
                          <ChevronUp className="w-4 h-4 ml-2" /> : 
                          <ChevronDown className="w-4 h-4 ml-2" />
                        }
                      </Button>
                      
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{user.user.fullName}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{user.user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{user.user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{user.profile.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Medical Info</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Blood Type:</strong> {user.profile.bloodType}</p>
                        <p><strong>Age:</strong> {user.profile.age} years</p>
                        <p><strong>Gender:</strong> {user.profile.gender}</p>
                        {user.type === 'donor' && (
                          <p><strong>Available:</strong> {user.profile.availableOrgans?.join(', ')}</p>
                        )}
                        {user.type === 'patient' && (
                          <>
                            <p><strong>Required:</strong> {user.profile.requiredOrgans?.join(', ')}</p>
                            {user.profile.waitingListPosition && (
                              <p><strong>List Position:</strong> #{user.profile.waitingListPosition}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Account Status</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Joined: {new Date(user.profile.registrationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Last active: {new Date(user.profile.lastActive).toLocaleDateString()}</span>
                        </div>
                        {user.type === 'patient' && user.profile.hospitalName && (
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4" />
                            <span>{user.profile.hospitalName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedUser === user.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Personal Details</h5>
                          <div className="text-sm space-y-2">
                            <p><strong>Height:</strong> {user.profile.height} cm</p>
                            <p><strong>Weight:</strong> {user.profile.weight} kg</p>
                            <p><strong>Emergency Contact:</strong> {user.profile.emergencyContact}</p>
                            <p><strong>Emergency Phone:</strong> {user.profile.emergencyPhone}</p>
                          </div>
                          
                          <h5 className="font-semibold text-gray-900 mb-3 mt-4">Medical History</h5>
                          <p className="text-sm text-gray-600 mb-4">
                            {user.profile.medicalHistory || user.profile.medicalCondition}
                          </p>
                          
                          {user.type === 'donor' && user.profile.lifestyle && (
                            <>
                              <h5 className="font-semibold text-gray-900 mb-3">Lifestyle</h5>
                              <p className="text-sm text-gray-600 mb-4">{user.profile.lifestyle}</p>
                            </>
                          )}
                        </div>
                        
                        <div>
                          {user.type === 'patient' && (
                            <>
                              <h5 className="font-semibold text-gray-900 mb-3">Treatment Information</h5>
                              <div className="text-sm space-y-2 mb-4">
                                <p><strong>Doctor:</strong> {user.profile.doctorName}</p>
                                <p><strong>Doctor Phone:</strong> {user.profile.doctorPhone}</p>
                                <p><strong>Hospital:</strong> {user.profile.hospitalName}</p>
                                <p><strong>Insurance:</strong> {user.profile.insuranceProvider}</p>
                                {user.profile.requiredBy && (
                                  <p><strong>Required By:</strong> {new Date(user.profile.requiredBy).toLocaleDateString()}</p>
                                )}
                              </div>
                            </>
                          )}
                          
                          {user.type === 'donor' && (
                            <>
                              <h5 className="font-semibold text-gray-900 mb-3">Donation History</h5>
                              <div className="text-sm text-gray-600 mb-4">
                                {user.profile.donationHistory?.length > 0 ? (
                                  <ul className="list-disc list-inside">
                                    {user.profile.donationHistory.map((donation, idx) => (
                                      <li key={idx}>{donation}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p>No previous donations</p>
                                )}
                              </div>
                            </>
                          )}
                          
                          <h5 className="font-semibold text-gray-900 mb-3">Account Actions</h5>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              <Mail className="w-4 h-4 mr-1" />
                              Send Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View Profile
                            </Button>
                            {user.profile.verificationStatus === 'pending' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Verify
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Suspend
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > 10 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">Showing {filteredUsers.length} users</p>
          </div>
        )}
      </div>
    </div>
  );
}
