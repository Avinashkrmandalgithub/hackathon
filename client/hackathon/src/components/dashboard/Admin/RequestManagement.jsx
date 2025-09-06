import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/Card.jsx';
import { Button } from '../../ui/Button.jsx';
import AdminNavigation from './AdminNavigation.jsx';
import {
  Users,
  Heart,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  User,
  Building2,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  MoreHorizontal
} from 'lucide-react';

export default function RequestManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Mock data for demonstration
  const mockRequests = [
    {
      id: 'DR-2024-001',
      type: 'donor',
      user: {
        name: 'Michael Rodriguez',
        email: 'michael.rodriguez@email.com',
        phone: '+1 (555) 123-4567',
        age: 32,
        bloodType: 'O+',
        location: 'San Francisco, CA'
      },
      organ: 'Kidney',
      urgency: 'normal',
      status: 'pending_review',
      submittedDate: '2024-01-15T10:30:00Z',
      medicalHistory: 'No significant medical history',
      previousDonations: 'Blood donation - 2 years ago',
      notes: 'Willing to donate to anyone in need',
      assignedTo: 'Dr. Sarah Johnson'
    },
    {
      id: 'PR-2024-045',
      type: 'patient',
      user: {
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        phone: '+1 (555) 987-6543',
        age: 28,
        bloodType: 'A+',
        location: 'Oakland, CA'
      },
      organ: 'Heart',
      urgency: 'critical',
      status: 'urgent_review',
      submittedDate: '2024-01-15T14:20:00Z',
      medicalHistory: 'Cardiomyopathy diagnosed 2021',
      condition: 'Critical - requires transplant within 30 days',
      hospital: 'UCSF Medical Center',
      doctor: 'Dr. James Chen',
      notes: 'Priority case - family willing to relocate if needed'
    },
    {
      id: 'DR-2024-002',
      type: 'donor',
      user: {
        name: 'David Chen',
        email: 'david.chen@email.com',
        phone: '+1 (555) 555-0123',
        age: 35,
        bloodType: 'B+',
        location: 'San Jose, CA'
      },
      organ: 'Liver',
      urgency: 'normal',
      status: 'approved',
      submittedDate: '2024-01-14T09:15:00Z',
      approvedDate: '2024-01-15T16:45:00Z',
      medicalHistory: 'Healthy, regular exercise',
      previousDonations: 'None',
      notes: 'Living donor, motivated by family experience',
      assignedTo: 'Dr. Lisa Park'
    },
    {
      id: 'PR-2024-044',
      type: 'patient',
      user: {
        name: 'Robert Johnson',
        email: 'robert.johnson@email.com',
        phone: '+1 (555) 234-5678',
        age: 45,
        bloodType: 'AB-',
        location: 'Berkeley, CA'
      },
      organ: 'Kidney',
      urgency: 'high',
      status: 'under_review',
      submittedDate: '2024-01-13T11:30:00Z',
      medicalHistory: 'Chronic kidney disease stage 4',
      condition: 'Requires dialysis, seeking transplant',
      hospital: 'Alta Bates Summit Medical Center',
      doctor: 'Dr. Maria Rodriguez',
      notes: 'Good candidate, strong support system'
    },
    {
      id: 'DR-2024-003',
      type: 'donor',
      user: {
        name: 'Jennifer Smith',
        email: 'jennifer.smith@email.com',
        phone: '+1 (555) 678-9012',
        age: 29,
        bloodType: 'A-',
        location: 'Palo Alto, CA'
      },
      organ: 'Bone Marrow',
      urgency: 'normal',
      status: 'rejected',
      submittedDate: '2024-01-12T15:45:00Z',
      rejectedDate: '2024-01-14T10:30:00Z',
      rejectionReason: 'Medical history incompatible',
      medicalHistory: 'Previous autoimmune condition',
      assignedTo: 'Dr. Kevin Wong'
    }
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterAndSortRequests();
  }, [requests, activeTab, searchQuery, selectedFilter, sortBy, sortOrder]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRequests(mockRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortRequests = () => {
    let filtered = requests;

    // Filter by tab
    if (activeTab !== 'all') {
      if (activeTab === 'donor') {
        filtered = filtered.filter(req => req.type === 'donor');
      } else if (activeTab === 'patient') {
        filtered = filtered.filter(req => req.type === 'patient');
      } else {
        filtered = filtered.filter(req => req.status === activeTab);
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(req =>
        req.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.organ.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'urgent') {
        filtered = filtered.filter(req => req.urgency === 'critical' || req.urgency === 'high');
      } else if (selectedFilter === 'recent') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filtered = filtered.filter(req => new Date(req.submittedDate) > oneWeekAgo);
      } else {
        filtered = filtered.filter(req => req.urgency === selectedFilter);
      }
    }

    // Sort requests
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.submittedDate);
          bValue = new Date(b.submittedDate);
          break;
        case 'name':
          aValue = a.user.name;
          bValue = b.user.name;
          break;
        case 'urgency':
          const urgencyOrder = { critical: 4, high: 3, normal: 2, low: 1 };
          aValue = urgencyOrder[a.urgency] || 0;
          bValue = urgencyOrder[b.urgency] || 0;
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

    setFilteredRequests(filtered);
  };

  const handleApproveRequest = async (requestId) => {
    try {
      // API call to approve request
      const response = await fetch(`http://localhost:8000/api/v1/admin/requests/${requestId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        // Update local state
        setRequests(prev => prev.map(req => 
          req.id === requestId 
            ? { ...req, status: 'approved', approvedDate: new Date().toISOString() }
            : req
        ));
      }
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request. Please try again.');
    }
  };

  const handleRejectRequest = async (requestId, reason) => {
    try {
      // API call to reject request
      const response = await fetch(`http://localhost:8000/api/v1/admin/requests/${requestId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ reason })
      });

      if (response.ok) {
        // Update local state
        setRequests(prev => prev.map(req => 
          req.id === requestId 
            ? { ...req, status: 'rejected', rejectedDate: new Date().toISOString(), rejectionReason: reason }
            : req
        ));
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'urgent_review':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'normal':
        return 'bg-blue-500 text-white';
      case 'low':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getRequestTypeIcon = (type) => {
    return type === 'donor' ? 
      <Heart className="w-4 h-4 text-green-500" /> : 
      <User className="w-4 h-4 text-blue-500" />;
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
              <h1 className="text-2xl font-bold text-gray-900">Request Management</h1>
              <p className="text-gray-600">Review and manage donor and recipient requests</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button onClick={fetchRequests} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
            {[
              { key: 'all', label: 'All Requests', count: requests.length },
              { key: 'donor', label: 'Donors', count: requests.filter(r => r.type === 'donor').length },
              { key: 'patient', label: 'Patients', count: requests.filter(r => r.type === 'patient').length },
              { key: 'pending_review', label: 'Pending', count: requests.filter(r => r.status === 'pending_review').length },
              { key: 'urgent_review', label: 'Urgent', count: requests.filter(r => r.status === 'urgent_review').length }
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
                placeholder="Search by name, ID, or organ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter by Priority */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent (Critical + High)</option>
              <option value="critical">Critical Only</option>
              <option value="high">High Only</option>
              <option value="normal">Normal Only</option>
              <option value="recent">Recent (Last 7 days)</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="urgency">Sort by Urgency</option>
              <option value="organ">Sort by Organ</option>
            </select>

            {/* Sort Order */}
            <Button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              variant="outline"
              className="flex items-center justify-center"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
            </Button>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  {/* Request Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getRequestTypeIcon(request.type)}
                        <span className="font-semibold text-gray-900">{request.id}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                          {request.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {expandedRequest === request.id ? 'Less' : 'Details'}
                        {expandedRequest === request.id ? 
                          <ChevronUp className="w-4 h-4 ml-2" /> : 
                          <ChevronDown className="w-4 h-4 ml-2" />
                        }
                      </Button>
                      
                      {(request.status === 'pending_review' || request.status === 'urgent_review') && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-300 hover:bg-red-50"
                            onClick={() => {
                              const reason = prompt('Please provide a reason for rejection:');
                              if (reason) {
                                handleRejectRequest(request.id, reason);
                              }
                            }}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{request.user.name}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{request.user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{request.user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{request.user.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Medical Info</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Organ:</strong> {request.organ}</p>
                        <p><strong>Blood Type:</strong> {request.user.bloodType}</p>
                        <p><strong>Age:</strong> {request.user.age} years</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Request Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                        </div>
                        {request.assignedTo && (
                          <div className="flex items-center space-x-2">
                            <Stethoscope className="w-4 h-4" />
                            <span>Assigned to: {request.assignedTo}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedRequest === request.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Medical History</h5>
                          <p className="text-sm text-gray-600 mb-4">{request.medicalHistory}</p>
                          
                          {request.previousDonations && (
                            <>
                              <h5 className="font-semibold text-gray-900 mb-3">Previous Donations</h5>
                              <p className="text-sm text-gray-600 mb-4">{request.previousDonations}</p>
                            </>
                          )}

                          {request.condition && (
                            <>
                              <h5 className="font-semibold text-gray-900 mb-3">Current Condition</h5>
                              <p className="text-sm text-gray-600 mb-4">{request.condition}</p>
                            </>
                          )}
                        </div>
                        
                        <div>
                          {request.hospital && (
                            <>
                              <h5 className="font-semibold text-gray-900 mb-3">Hospital Information</h5>
                              <div className="text-sm text-gray-600 mb-4">
                                <p><strong>Hospital:</strong> {request.hospital}</p>
                                {request.doctor && <p><strong>Doctor:</strong> {request.doctor}</p>}
                              </div>
                            </>
                          )}
                          
                          <h5 className="font-semibold text-gray-900 mb-3">Additional Notes</h5>
                          <p className="text-sm text-gray-600 mb-4">{request.notes}</p>
                          
                          {request.rejectionReason && (
                            <>
                              <h5 className="font-semibold text-red-700 mb-3">Rejection Reason</h5>
                              <p className="text-sm text-red-600">{request.rejectionReason}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination could go here */}
        {filteredRequests.length > 10 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">Showing {filteredRequests.length} requests</p>
          </div>
        )}
      </div>
    </div>
  );
}
