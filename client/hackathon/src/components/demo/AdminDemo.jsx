import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import {
  Shield,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function AdminDemo() {
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    // Set mock admin data for demo purposes
    const mockAdminData = {
      admin: {
        _id: 'demo-admin-1',
        user: {
          fullName: 'Demo Administrator',
          email: 'admin@demo.com'
        },
        role: 'admin',
        location: 'San Francisco, CA'
      },
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token'
    };

    localStorage.setItem('adminData', JSON.stringify(mockAdminData));
    navigate('/admin/dashboard');
  };

  const adminFeatures = [
    {
      title: 'System Dashboard',
      description: 'Comprehensive overview of all system activities, user statistics, and real-time monitoring',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Request Management',
      description: 'Review and manage donor and recipient requests with approval/rejection capabilities',
      icon: FileText,
      path: '/admin/requests',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'User Management',
      description: 'Manage all platform users including donors, patients, hospitals, and medical professionals',
      icon: Users,
      path: '/admin/users',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings, admin permissions, and system parameters',
      icon: Settings,
      path: '/admin/settings',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl shadow-2xl mb-6">
            <Shield className="w-10 h-10 text-white"/>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard Demo</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Experience the complete admin interface for the Organ Donation Management System
          </p>
        </div>

        {/* Demo Login Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm mb-12 max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white"/>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Demo Access</h2>
            <p className="text-gray-600 mb-6">
              Click below to access the admin dashboard with demo data. No authentication required for testing.
            </p>
            <Button
              onClick={handleDemoLogin}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Shield className="w-5 h-5 mr-2" />
              Access Admin Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Demo credentials will be automatically set</p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {adminFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                    <span className="font-medium">Available after login</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Authentication Note */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Production Authentication</h3>
              <p className="text-gray-600 mb-6">
                In a production environment, admin access requires proper authentication through the secure login system.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/admin/login">
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    <Lock className="w-4 h-4 mr-2" />
                    Production Login
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
