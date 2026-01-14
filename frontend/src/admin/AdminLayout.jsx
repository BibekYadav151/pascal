import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Bell, X, CheckCircle, AlertCircle, Info, Calendar } from 'lucide-react';

const AdminLayout = () => {
  const { isAdmin, adminEmail, adminLogout, contactMessages, classInquiries, programInquiries, appointments } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }

    // Generate notifications from various sources
    const newNotifications = [];
    
    // Unread contact messages
    const unreadMessages = contactMessages.filter(m => !m.read);
    if (unreadMessages.length > 0) {
      newNotifications.push({
        id: 'messages',
        type: 'message',
        title: 'New Contact Messages',
        count: unreadMessages.length,
        description: `${unreadMessages.length} new contact message(s) waiting for your response`,
        link: '/admin/messages',
        icon: <Bell className="h-4 w-4" />
      });
    }

    // New class inquiries
    const newClassInquiries = classInquiries.filter(i => i.status === 'New');
    if (newClassInquiries.length > 0) {
      newNotifications.push({
        id: 'class-inquiries',
        type: 'inquiry',
        title: 'New Class Inquiries',
        count: newClassInquiries.length,
        description: `${newClassInquiries.length} new class inquiry(ies) need attention`,
        link: '/admin/class-inquiries',
        icon: <Info className="h-4 w-4" />
      });
    }

    // New program inquiries
    const newProgramInquiries = programInquiries.filter(i => i.status === 'New');
    if (newProgramInquiries.length > 0) {
      newNotifications.push({
        id: 'program-inquiries',
        type: 'inquiry',
        title: 'New Program Inquiries',
        count: newProgramInquiries.length,
        description: `${newProgramInquiries.length} new program inquiry(ies) need attention`,
        link: '/admin/program-inquiries',
        icon: <Info className="h-4 w-4" />
      });
    }

    // Pending appointments
    const pendingAppointments = appointments.filter(a => a.status === 'Pending');
    if (pendingAppointments.length > 0) {
      newNotifications.push({
        id: 'appointments',
        type: 'appointment',
        title: 'Pending Appointments',
        count: pendingAppointments.length,
        description: `${pendingAppointments.length} appointment(s) need confirmation`,
        link: '/admin/appointments',
        icon: <Calendar className="h-4 w-4" />
      });
    }

    setNotifications(newNotifications);
  }, [isAdmin, navigate, contactMessages, classInquiries, programInquiries, appointments]);

  if (!isAdmin) {
    return null;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Classes', path: '/admin/classes', icon: '🎓' },
    { name: 'Class Inquiries', path: '/admin/class-inquiries', icon: '📨' },
    { name: 'Programs', path: '/admin/programs', icon: '📚' },
    { name: 'Program Inquiries', path: '/admin/program-inquiries', icon: '📩' },
    { name: 'Institute Classes', path: '/admin/institute-classes', icon: '🏫' },
    { name: 'Universities', path: '/admin/universities', icon: '🏛️' },
    { name: 'Contact Messages', path: '/admin/messages', icon: '💬' },
    { name: 'Appointments', path: '/admin/appointments', icon: '📅' }
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard Overview';
    if (path.includes('classes')) return 'Class Management';
    if (path.includes('class-inquiries')) return 'Class Inquiries';
    if (path.includes('programs')) return 'Program Management';
    if (path.includes('program-inquiries')) return 'Program Inquiries';
    if (path.includes('institute-classes')) return 'Institute Classes';
    if (path.includes('universities')) return 'University Management';
    if (path.includes('messages')) return 'Contact Messages';
    if (path.includes('appointments')) return 'Appointment Management';
    return 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation - Always visible on larger screens */}
      <div className="w-64 flex-shrink-0 hidden lg:block border-r border-gray-200">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Pascal Institute</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 flex-1 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Menu</p>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-50 ${
                    location.pathname.includes(item.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">👤</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{adminEmail}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Admin Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg font-bold text-gray-900">{getPageTitle()}</h1>
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {notifications.length}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                          <div className="divide-y divide-gray-100">
                            {notifications.map((notification) => (
                              <Link
                                key={notification.id}
                                to={notification.link}
                                onClick={() => setShowNotifications(false)}
                                className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  {notification.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <p className="font-semibold text-gray-900 text-sm">{notification.title}</p>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                      {notification.count}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 text-center">
                            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                            <p className="text-gray-600 text-sm">All caught up!</p>
                            <p className="text-gray-500 text-xs mt-1">No new notifications</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

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

        {/* Page Content */}
        <main className="flex-1 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;