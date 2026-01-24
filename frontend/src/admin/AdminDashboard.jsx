import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import { useClasses } from '../hooks/useClasses';
import { usePrograms } from '../hooks/usePrograms';

const AdminDashboard = () => {
  const { classInquiries, programInquiries, contactMessages, appointments } = useApp();
  const { data: classesResponse } = useClasses();
  const { data: programsResponse } = usePrograms();

  const classes = classesResponse?.data || [];
  const programs = programsResponse?.data || [];

  const stats = {
    totalInquiries: classInquiries.length + programInquiries.length,
    classApplications: classInquiries.length,
    programApplications: programInquiries.length,
    activeClasses: classes.filter(c => c.status === 'Active').length,
    activePrograms: programs.filter(p => p.status === 'Active').length,
    unreadMessages: contactMessages.filter(m => !m.read).length,
    pendingAppointments: appointments.filter(a => a.status === 'Pending').length
  };

  const recentInquiries = [
    ...classInquiries.slice(-5).map(i => ({ ...i, type: 'Class' })),
    ...programInquiries.slice(-5).map(i => ({ ...i, type: 'Program' }))
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const recentMessages = contactMessages.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div className="flex gap-8">
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
            <div className="bg-white rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <span className="text-xl">📊</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</div>
              </div>
              <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                  <span className="text-xl">🎓</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.classApplications}</div>
              </div>
              <p className="text-sm font-medium text-gray-600">Class Applications</p>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                  <span className="text-xl">📚</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.programApplications}</div>
              </div>
              <p className="text-sm font-medium text-gray-600">Program Applications</p>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                  <span className="text-xl">🏫</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.activeClasses}</div>
              </div>
              <p className="text-sm font-medium text-gray-600">Active Classes</p>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-pink-600">
                  <span className="text-xl">📖</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.activePrograms}</div>
              </div>
              <p className="text-sm font-medium text-gray-600">Active Programs</p>
            </div>

            <div className="bg-white rounded-xl p-6 hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                  <span className="text-xl">💬</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stats.unreadMessages}</div>
              </div>
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
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
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${inquiry.status === 'New'
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

          {/* Recent Appointments */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Appointments</h3>
              <Link
                to="/admin/appointments"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                View All
                <span>→</span>
              </Link>
            </div>

            {appointments.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="divide-y divide-gray-100">
                  {appointments.slice(-5).reverse().map((appointment) => {
                    const getStatusBadge = (status) => {
                      const statusConfig = {
                        'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
                        'Confirmed': { bg: 'bg-green-100', text: 'text-green-800' },
                        'Completed': { bg: 'bg-blue-100', text: 'text-blue-800' },
                        'Cancelled': { bg: 'bg-red-100', text: 'text-red-800' }
                      };
                      return statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
                    };

                    const statusBadge = getStatusBadge(appointment.status);

                    return (
                      <div key={appointment.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-lg text-indigo-600">📅</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 text-sm truncate">{appointment.fullName}</h4>
                                <p className="text-xs text-gray-500 truncate">{appointment.email}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                              <p className="text-xs text-gray-500">{appointment.appointmentTime}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 p-8 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl text-indigo-600">📅</span>
                </div>
                <p className="text-gray-600 text-sm">No appointments yet</p>
                <p className="text-gray-500 text-xs mt-1">Appointments will appear here when booked</p>
              </div>
            )}
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
                to="/admin/appointments"
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all text-center group border border-gray-100"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📅</div>
                <p className="font-semibold text-gray-900 text-sm">Manage Appointments</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
