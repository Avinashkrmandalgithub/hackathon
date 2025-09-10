import React from 'react';
import { Heart, Users, ClipboardList, CheckCircle2, Clock4, Search, ChevronDown, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Donors', value: 3, icon: Heart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Patients', value: 2, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Review', value: 2, icon: Clock4, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Approved', value: 2, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const applications = [
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', type: 'donor', organ: 'Kidney', blood: 'O+', age: 35, urgency: '-', status: 'Submitted' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', type: 'patient', organ: 'Heart', blood: 'A-', age: 42, urgency: 'High', status: 'Under Review' },
    { id: 3, name: 'Mike Wilson', email: 'mike.w@email.com', type: 'donor', organ: 'Liver', blood: 'B+', age: 29, urgency: '-', status: 'Submitted' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 rounded-lg p-2 mr-3">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">OrganMatch</h2>
              <p className="text-sm text-gray-600">Donor</p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-medium text-gray-800">Admin</h3>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <button className="w-full flex items-center px-4 py-3 text-left bg-blue-500 text-white rounded-lg font-medium">Dashboard</button>
          <button className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg">Profile</button>
          <button className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg">Application Status</button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Top header */}
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-3">
            <ClipboardList className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage donors, patients, and organ matching</p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className={`bg-white rounded-xl shadow-sm p-6 flex items-center justify-between`}>
                <div>
                  <p className="text-sm text-gray-600">{s.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{s.value}</p>
                </div>
                <div className={`${s.bg} ${s.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Applications Management */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="bg-gray-100 p-2 rounded-lg mr-3">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Applications Management</h2>
              <p className="text-sm text-gray-600">Review and approve donor and patient applications</p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Search by name or email..." />
            </div>
            <div>
              <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-gray-700">
                <span>All Status</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div>
              <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg text-gray-700">
                <span>All Types</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Organ</th>
                  <th className="py-3 px-4 font-medium">Blood Group</th>
                  <th className="py-3 px-4 font-medium">Age</th>
                  <th className="py-3 px-4 font-medium">Urgency</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((a) => (
                  <tr key={a.id} className="text-sm text-gray-800">
                    <td className="py-3 px-4">
                      <div className="font-medium">{a.name}</div>
                      <div className="text-gray-500">{a.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${a.type === 'donor' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                        {a.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">{a.organ}</td>
                    <td className="py-3 px-4">{a.blood}</td>
                    <td className="py-3 px-4">{a.age}</td>
                    <td className="py-3 px-4">
                      {a.urgency === '-' ? '-' : (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">{a.urgency}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${a.status === 'Submitted' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-800'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                          <CheckCircle className="w-3 h-3 mr-1" /> Approve
                        </button>
                        <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                          <XCircle className="w-3 h-3 mr-1" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
