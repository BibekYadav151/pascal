import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    MdDashboard, MdSchool, MdClass, MdQuestionAnswer,
    MdLocalLibrary, MdMessage, MdEvent, MdArticle,
    MdPhotoLibrary, MdLocalOffer, MdLocationOn,
    MdGroup, MdPerson, MdPersonOutline
} from 'react-icons/md';
import { FaUniversity } from 'react-icons/fa';
import useAuthStore from '../../store/authStore';

const AdminSidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { user } = useAuthStore();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <MdDashboard size={20} /> },
        { name: 'Classes', path: '/admin/classes', icon: <MdClass size={20} /> },
        { name: 'Class Inquiries', path: '/admin/class-inquiries', icon: <MdQuestionAnswer size={20} /> },
        { name: 'Programs', path: '/admin/programs', icon: <MdLocalLibrary size={20} /> },
        { name: 'Program Inquiries', path: '/admin/program-inquiries', icon: <MdQuestionAnswer size={20} /> },
        { name: 'Institute Class', path: '/admin/institute-classes', icon: <MdSchool size={20} /> },
        { name: 'Universities', path: '/admin/universities', icon: <FaUniversity size={18} /> },
        { name: 'Blogs', path: '/admin/blogs', icon: <MdArticle size={20} /> },
        { name: 'Gallery', path: '/admin/gallery', icon: <MdPhotoLibrary size={20} /> },
        { name: 'Offers', path: '/admin/offers', icon: <MdLocalOffer size={20} /> },
        { name: 'Branches', path: '/admin/branches', icon: <MdLocationOn size={20} /> },
        { name: 'Teams', path: '/admin/teams', icon: <MdGroup size={20} /> },
        { name: 'Users', path: '/admin/users', icon: <MdPerson size={20} /> },
        { name: 'Messages', path: '/admin/messages', icon: <MdMessage size={20} /> },
        { name: 'Appointments', path: '/admin/appointments', icon: <MdEvent size={20} /> }
    ];

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Brand */}
                    <div className="h-16 flex items-center px-6 border-b border-gray-100">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Pascal Edu</h1>
                            <p className="text-xs text-gray-500">Admin Portal</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = location.pathname.includes(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <span className={`${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                <MdPersonOutline size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Admin'}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
