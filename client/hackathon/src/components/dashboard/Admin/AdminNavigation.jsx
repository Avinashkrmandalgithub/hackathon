import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button.jsx';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';

export default function AdminNavigation({ className = "" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'System overview'
    },
    {
      path: '/admin/requests',
      label: 'Requests',
      icon: FileText,
      description: 'Manage requests'
    },
    {
      path: '/admin/users',
      label: 'Users',
      icon: Users,
      description: 'User management'
    },
    {
      path: '/admin/settings',
      label: 'Settings',
      icon: Settings,
      description: 'System settings'
    }
  ];

  return (
    <div className={`bg-white shadow-sm border border-gray-100 rounded-2xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-600">System Management</p>
          </div>
        </div>
        
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                isActive
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-semibold text-sm ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                    {item.label}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
