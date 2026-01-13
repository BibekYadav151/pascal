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
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Pascal Institute</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">{adminEmail}</span>
              <button
                onClick={adminLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4 4m4-4v12m-4-16h14" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
              <nav className="p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Menu</p>
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-50"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-gray-700">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
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
              <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{stats.totalInquiries}</div>
                </div>
                <p className="text-sm text-gray-500">Total Inquiries</p>
              </div>

              <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div className="text-3xl font-bold text-green-600">{stats.classApplications}</div>
                </div>
                <p className="text-sm text-gray-500">Class Applications</p>
              </div>

              <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-600">{stats.programApplications}</div>
                </div>
                <p className="text-sm text-gray-500">Program Applications</p>
              </div>

              <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏫</span>
                  </div>
                  <div className="text-3xl font-bold text-orange-600">{stats.activeClasses}</div>
                </div>
                <p className="text-sm text-gray-500">Active Classes</p>
              </div>

              <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📖</span>
                  </div>
                  <div className="text-3xl font-bold text-pink-600">{stats.activePrograms}</div>
                </div>
                <p className="text-sm text-gray-500">Active Programs</p>
              </div>

              <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div className="text-3xl font-bold text-red-600">{stats.unreadMessages}</div>
                </div>
                <p className="text-sm text-gray-500">Unread Messages</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Inquiries */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Recent Inquiries</h3>
                </div>
                <div className="p-6">
                  {recentInquiries.length > 0 ? (
                    <div className="space-y-4">
                      {recentInquiries.map((inquiry) => (
                        <div
                          key={inquiry.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{inquiry.studentName}</p>
                            <p className="text-xs text-gray-500">{inquiry.type} - {inquiry.className || inquiry.programName}</p>
                            <p className="text-xs text-gray-400">{new Date(inquiry.date).toLocaleDateString()}</p>
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
                    <p className="text-gray-500 text-center py-8 text-sm">No inquiries yet</p>
                  )}
                </div>
              </div>

              {/* Recent Contact Messages */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Recent Messages</h3>
                </div>
                <div className="p-6">
                  {recentMessages.length > 0 ? (
                    <div className="space-y-4">
                      {recentMessages.map((message) => (
                        <div
                          key={message.id}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          {!message.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm">{message.name}</p>
                            <p className="text-xs text-gray-500 truncate">{message.subject}</p>
                            <p className="text-xs text-gray-400">{new Date(message.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8 text-sm">No messages yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/admin/classes"
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all text-center group border border-gray-100"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">➕</div>
                  <p className="font-semibold text-gray-900 text-sm">Add Class</p>
                </Link>
                <Link
                  to="/admin/programs"
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all text-center group border border-gray-100"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">➕</div>
                  <p className="font-semibold text-gray-900 text-sm">Add Program</p>
                </Link>
                <Link
                  to="/admin/class-inquiries"
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all text-center group border border-gray-100"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📨</div>
                  <p className="font-semibold text-gray-900 text-sm">View Inquiries</p>
                </Link>
                <Link
                  to="/admin/messages"
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all text-center group border border-gray-100"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💬</div>
                  <p className="font-semibold text-gray-900 text-sm">View Messages</p>
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
