import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, adminEmail, adminLogout, getDashboardStats, classInquiries, programInquiries, contactMessages } = useApp();

  const stats = getDashboardStats();

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const recentInquiries = [
    ...classInquiries.slice(-5).map(i => ({ ...i, type: 'Class' })),
    ...programInquiries.slice(-5).map(i => ({ ...i, type: 'Program' }))
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const recentMessages = contactMessages.slice(-5).reverse();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Classes', path: '/admin/classes', icon: '🎓' },
    { name: 'Class Inquiries', path: '/admin/class-inquiries', icon: '📨' },
    { name: 'Programs', path: '/admin/programs', icon: '📚' },
    { name: 'Program Inquiries', path: '/admin/program-inquiries', icon: '📩' },
    { name: 'Institute Classes', path: '/admin/institute-classes', icon: '🏫' },
    { name: 'Universities', path: '/admin/universities', icon: '🏛️' },
    { name: 'Contact Messages', path: '/admin/messages', icon: '💬' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-sm text-blue-200">Pascal Institute</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm">{adminEmail}</span>
            <button
              onClick={adminLogout}
              className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <nav className="py-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard Overview
              </h2>
              <p className="text-gray-600">
                Welcome back! Here's what's happening with Pascal Institute.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">📊</div>
                  <div className="text-3xl font-bold">{stats.totalInquiries}</div>
                </div>
                <p className="text-blue-100">Total Inquiries</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">🎓</div>
                  <div className="text-3xl font-bold">{stats.classApplications}</div>
                </div>
                <p className="text-green-100">Class Applications</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">📚</div>
                  <div className="text-3xl font-bold">{stats.programApplications}</div>
                </div>
                <p className="text-purple-100">Program Applications</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">🏫</div>
                  <div className="text-3xl font-bold">{stats.activeClasses}</div>
                </div>
                <p className="text-orange-100">Active Classes</p>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">📖</div>
                  <div className="text-3xl font-bold">{stats.activePrograms}</div>
                </div>
                <p className="text-pink-100">Active Programs</p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">💬</div>
                  <div className="text-3xl font-bold">{stats.unreadMessages}</div>
                </div>
                <p className="text-red-100">Unread Messages</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Inquiries */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Recent Inquiries</h3>
                </div>
                <div className="p-6">
                  {recentInquiries.length > 0 ? (
                    <div className="space-y-4">
                      {recentInquiries.map((inquiry) => (
                        <div
                          key={inquiry.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">{inquiry.studentName}</p>
                            <p className="text-sm text-gray-600">
                              {inquiry.type} - {inquiry.className || inquiry.programName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(inquiry.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            inquiry.status === 'New'
                              ? 'bg-green-100 text-green-800'
                              : inquiry.status === 'Contacted'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {inquiry.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No inquiries yet</p>
                  )}
                </div>
              </div>

              {/* Recent Contact Messages */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Recent Messages</h3>
                </div>
                <div className="p-6">
                  {recentMessages.length > 0 ? (
                    <div className="space-y-4">
                      {recentMessages.map((message) => (
                        <div
                          key={message.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              {message.read ? (
                                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                              ) : (
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              )}
                              <p className="font-semibold text-gray-900">{message.name}</p>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {message.subject}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(message.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No messages yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  to="/admin/classes"
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-center hover:-translate-y-1"
                >
                  <div className="text-4xl mb-2">➕</div>
                  <p className="font-semibold text-gray-700">Add Class</p>
                </Link>
                <Link
                  to="/admin/programs"
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-center hover:-translate-y-1"
                >
                  <div className="text-4xl mb-2">➕</div>
                  <p className="font-semibold text-gray-700">Add Program</p>
                </Link>
                <Link
                  to="/admin/class-inquiries"
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-center hover:-translate-y-1"
                >
                  <div className="text-4xl mb-2">📨</div>
                  <p className="font-semibold text-gray-700">View Inquiries</p>
                </Link>
                <Link
                  to="/admin/messages"
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all text-center hover:-translate-y-1"
                >
                  <div className="text-4xl mb-2">💬</div>
                  <p className="font-semibold text-gray-700">View Messages</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
