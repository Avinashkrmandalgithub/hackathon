import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../ui/Card.jsx';
import { Button } from '../../ui/Button.jsx';
import AdminNavigation from './AdminNavigation.jsx';
import {
  Users,
  Heart,
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Bell,
  Filter,
  Download,
  Search,
  Calendar,
  MapPin,
  Shield,
  UserCheck,
  Building2,
  Stethoscope,
  FileText,
  BarChart3,
  PieChart,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('today');

  // Mock data for demonstration
  const mockStats = {
    totalUsers: 15420,
    totalDonors: 8240,
    totalPatients: 6180,
    totalHospitals: 145,
    totalMedicalProfessionals: 855,
    
    pendingDonorRequests: 23,
    pendingPatientRequests: 41,
    approvedToday: 12,
    rejectedToday: 3,
    
    activeMatches: 89,
    successfulMatches: 1205,
    matchSuccessRate: 87.3,
    
    systemHealth: 'excellent',
    serverUptime: '99.9%',
    responseTime: '120ms',
    
    recentGrowth: {
      users: 12.5,
      donations: 8.7,
      matches: 15.2
    }
  };

  const mockActivities = [
    {
      id: 1,
      type: 'donor_request',
      title: 'New donor registration approved',
      user: 'Dr. Sarah Johnson',
      time: '2 minutes ago',
      status: 'approved',
      priority: 'normal'
    },
    {
      id: 2,
      type: 'match_found',
      title: 'Critical match found for Patient #4521',
      user: 'System',
      time: '5 minutes ago',
      status: 'success',
      priority: 'critical'
    },
    {
      id: 3,
      type: 'patient_request',
      title: 'Urgent patient request requires review',
      user: 'Oakland General Hospital',
      time: '12 minutes ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 4,
      type: 'system_alert',
      title: 'Server maintenance scheduled',
      user: 'System Admin',
      time: '1 hour ago',
      status: 'scheduled',
      priority: 'normal'
    },
    {
      id: 5,
      type: 'user_registration',
      title: 'New medical professional verified',
      user: 'SF Medical Center',
      time: '2 hours ago',
      status: 'completed',
      priority: 'normal'
    }
  ];

  const mockPendingRequests = [
    {
      id: 'DR-2024-001',
      type: 'donor',
      user: 'Michael Rodriguez',
      organ: 'Kidney',
      urgency: 'normal',
      submittedDate: '2024-01-15',
      status: 'pending_review'
    },
    {
      id: 'PR-2024-045',
      type: 'patient',
      user: 'Emma Wilson',
      organ: 'Heart',
      urgency: 'critical',
      submittedDate: '2024-01-15',
      status: 'urgent_review'
    },
    {
      id: 'DR-2024-002',
      type: 'donor',
      user: 'David Chen',
      organ: 'Liver',
      urgency: 'normal',
      submittedDate: '2024-01-14',
      status: 'pending_review'
    }
  ];

  useEffect(() => {
    fetchDashboardData();
  }, [selectedTimeFrame]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockStats);
      setRecentActivities(mockActivities);
      setPendingRequests(mockPendingRequests);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'donor_request':
        return <Heart className="w-4 h-4 text-green-500" />;
      case 'patient_request':
        return <UserCheck className="w-4 h-4 text-blue-500" />;
      case 'match_found':
        return <Activity className="w-4 h-4 text-purple-500" />;
      case 'system_alert':
        return <Shield className="w-4 h-4 text-orange-500" />;
      case 'user_registration':
        return <Users className="w-4 h-4 text-indigo-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal':
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
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Organ Donation Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Time Frame Selector */}
              <select
                value={selectedTimeFrame}
                onChange={(e) => setSelectedTimeFrame(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              
              {/* Action Buttons */}
              <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              
              {/* Notifications */}
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Admin Navigation */}
        <AdminNavigation className="mb-8" />
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">+{stats.recentGrowth?.users}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Matches */}
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Matches</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeMatches}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">+{stats.recentGrowth?.matches}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Requests */}
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.pendingDonorRequests + stats.pendingPatientRequests}
                    </p>
                  </div>
                </div>
                <div className="text-orange-600">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Rate */}
          <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Match Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.matchSuccessRate}%</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Excellent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - System Overview & Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Type Distribution */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">User Distribution</h3>
                  <div className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-gray-400" />
                    <select className="text-sm border border-gray-300 rounded px-2 py-1">
                      <option>All Time</option>
                      <option>This Month</option>
                      <option>This Week</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{stats.totalDonors?.toLocaleString()}</p>
                    <p className="text-sm text-green-700 font-medium">Donors</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{stats.totalPatients?.toLocaleString()}</p>
                    <p className="text-sm text-blue-700 font-medium">Patients</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{stats.totalHospitals}</p>
                    <p className="text-sm text-purple-700 font-medium">Hospitals</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{stats.totalMedicalProfessionals}</p>
                    <p className="text-sm text-orange-700 font-medium">Medical Pros</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health Status */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">All Systems Operational</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Server Uptime</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.serverUptime}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <Activity className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.responseTime}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Active Sessions</span>
                      <Users className="w-4 h-4 text-purple-500" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activities & Pending Requests */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{activity.time}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                            {activity.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Requests */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pending Requests</h3>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{request.user}</p>
                          <p className="text-sm text-gray-600">ID: {request.id}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{request.organ} • {request.type}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/admin/users">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
              <Link to="/admin/requests">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Activity className="w-4 h-4 mr-2" />
                  View Requests
                </Button>
              </Link>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Reports
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
