import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  MdDashboard, MdSchool, MdClass, MdQuestionAnswer,
  MdLocalLibrary, MdMessage, MdEvent, MdArticle,
  MdPhotoLibrary, MdLocalOffer, MdLocationOn,
  MdGroup, MdPerson, MdNotifications, MdClose,
  MdCheckCircle, MdMenu, MdSearch, MdLogout
} from 'react-icons/md';
import { FaUniversity } from 'react-icons/fa';
import useAuthStore from '../store/authStore';

import AdminSidebar from './components/AdminSidebar';

const AdminLayout = () => {
  const { contactMessages, classInquiries, programInquiries, appointments } = useApp();
  const { isAuthenticated, logout: adminLogout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const newNotifications = [];

    // Notifications logic
    const unreadMessages = contactMessages.filter(m => !m.read);
    if (unreadMessages.length > 0) {
      newNotifications.push({
        id: 'messages',
        title: 'New Messages',
        count: unreadMessages.length,
        description: `${unreadMessages.length} unread messages`,
        link: '/admin/messages',
        icon: <MdMessage className="h-4 w-4" />
      });
    }

    const newClassInquiries = classInquiries.filter(i => i.status === 'New');
    if (newClassInquiries.length > 0) {
      newNotifications.push({
        id: 'class-inquiries',
        title: 'Class Inquiries',
        count: newClassInquiries.length,
        description: `${newClassInquiries.length} new inquiries`,
        link: '/admin/class-inquiries',
        icon: <MdQuestionAnswer className="h-4 w-4" />
      });
    }

    const newProgramInquiries = programInquiries.filter(i => i.status === 'New');
    if (newProgramInquiries.length > 0) {
      newNotifications.push({
        id: 'program-inquiries',
        title: 'Program Inquiries',
        count: newProgramInquiries.length,
        description: `${newProgramInquiries.length} new inquiries`,
        link: '/admin/program-inquiries',
        icon: <MdQuestionAnswer className="h-4 w-4" />
      });
    }

    const pendingAppointments = appointments.filter(a => a.status === 'Pending');
    if (pendingAppointments.length > 0) {
      newNotifications.push({
        id: 'appointments',
        title: 'Appointments',
        count: pendingAppointments.length,
        description: `${pendingAppointments.length} pending`,
        link: '/admin/appointments',
        icon: <MdEvent className="h-4 w-4" />
      });
    }

    setNotifications(newNotifications);
  }, [isAuthenticated, contactMessages, classInquiries, programInquiries, appointments]);

  // Auth check needs to be handled by a higher level component or route guard effectively, 
  // but keeping basic check here
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  // Simple title mapping
  const getPageTitle = () => {
    if (location.pathname.includes('dashboard')) return 'Dashboard';
    if (location.pathname.includes('classes') && !location.pathname.includes('inquiries')) return 'Classes';
    if (location.pathname.includes('class-inquiries')) return 'Class Inquiries';
    if (location.pathname.includes('programs') && !location.pathname.includes('inquiries')) return 'Programs';
    if (location.pathname.includes('program-inquiries')) return 'Program Inquiries';
    if (location.pathname.includes('institute-classes')) return 'Institute Classes';
    if (location.pathname.includes('universities')) return 'Universities';
    if (location.pathname.includes('blogs')) return 'Blogs';
    if (location.pathname.includes('gallery')) return 'Gallery';
    if (location.pathname.includes('offers')) return 'Offers';
    if (location.pathname.includes('branches')) return 'Branches';
    if (location.pathname.includes('teams')) return 'Teams';
    if (location.pathname.includes('users')) return 'Users';
    if (location.pathname.includes('messages')) return 'Messages';
    if (location.pathname.includes('appointments')) return 'Appointments';
    return 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-200">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 sticky top-0 z-30 w-full">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <MdMenu size={24} />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-64">
                <MdSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none text-sm focus:ring-0 w-full p-0 text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors"
                >
                  <MdNotifications size={22} />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-500">
                        <MdClose size={18} />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <Link
                            key={notification.id}
                            to={notification.link}
                            onClick={() => setShowNotifications(false)}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-blue-500 mt-0.5">{notification.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-500">{notification.description}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-gray-500">
                          <p className="text-sm">No new notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-6 w-px bg-gray-200 mx-1"></div>

              <button
                onClick={adminLogout}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                <MdLogout size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;