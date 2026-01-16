import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, XCircle, Clock, Calendar, User, Mail, Phone, MapPin, Edit, Trash2, Search, Filter, X, Eye } from 'lucide-react';

const AdminAppointments = () => {
  const { 
    isAdmin, 
    appointments, 
    addAppointment, 
    updateAppointment, 
    deleteAppointment 
  } = useApp();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewingAppointment, setViewingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    appointmentType: '',
    appointmentDate: '',
    appointmentTime: '',
    preferredCountry: '',
    message: '',
    status: 'Pending'
  });

  // Load appointments
  useEffect(() => {
    if (!isAdmin) return;
    setLoading(false);
  }, [isAdmin]);

  const handleAddAppointment = () => {
    setEditMode(false);
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      appointmentType: 'counseling',
      appointmentDate: '',
      appointmentTime: '',
      preferredCountry: '',
      message: '',
      status: 'Pending'
    });
    setShowModal(true);
  };

  const handleEditAppointment = (appointment) => {
    setEditMode(true);
    setSelectedAppointment(appointment);
    setFormData({
      fullName: appointment.fullName,
      email: appointment.email,
      phoneNumber: appointment.phoneNumber,
      appointmentType: appointment.appointmentType,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      preferredCountry: appointment.preferredCountry,
      message: appointment.message,
      status: appointment.status
    });
    setShowModal(true);
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAppointment = {
      ...formData,
      id: editMode ? selectedAppointment.id : Date.now(),
      createdAt: editMode ? selectedAppointment.createdAt : new Date().toISOString()
    };

    if (editMode) {
      updateAppointment(selectedAppointment.id, newAppointment);
    } else {
      addAppointment(newAppointment);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setEditMode(false);
  };

  const handleStatusChange = (id, newStatus) => {
    const appointmentToUpdate = appointments.find(a => a.id === id);
    if (appointmentToUpdate) {
      updateAppointment(id, { ...appointmentToUpdate, status: newStatus });
    }
  };

  // Filter and search appointments
  const filteredAppointments = appointments
    .filter(appointment => {
      if (filterStatus === 'all') return true;
      return appointment.status === filterStatus;
    })
    .filter(appointment => {
      const searchLower = searchTerm.toLowerCase();
      return (
        appointment.fullName.toLowerCase().includes(searchLower) ||
        appointment.email.toLowerCase().includes(searchLower) ||
        appointment.phoneNumber.includes(searchTerm) ||
        appointment.appointmentType.toLowerCase().includes(searchLower) ||
        appointment.preferredCountry?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      const dateA = new Date(a.appointmentDate);
      const dateB = new Date(b.appointmentDate);
      return dateB - dateA;
    });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'Confirmed': { bg: 'bg-green-100', text: 'text-green-800' },
      'Completed': { bg: 'bg-blue-100', text: 'text-blue-800' },
      'Cancelled': { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    return statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  const getAppointmentTypeInfo = (type) => {
    const types = {
      'counseling': { name: 'Study Abroad Counseling', icon: '🎓', color: 'text-blue-600' },
      'course-selection': { name: 'Course Selection', icon: '📚', color: 'text-green-600' },
      'visa-guidance': { name: 'Visa Guidance', icon: '🛂', color: 'text-purple-600' },
      'test-prep': { name: 'Test Preparation', icon: '📝', color: 'text-orange-600' }
    };
    
    return types[type] || { name: type, icon: '📅', color: 'text-gray-600' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600">Manage student appointments and consultations</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAddAppointment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>➕</span> Add Appointment
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, phone, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Appointments Found</h3>
            <p className="text-gray-600 mb-4">There are no appointments matching your criteria.</p>
            <button
              onClick={handleAddAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Create First Appointment
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredAppointments.map((appointment) => {
              const typeInfo = getAppointmentTypeInfo(appointment.appointmentType);
              const statusBadge = getStatusBadge(appointment.status);

              return (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Appointment Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full ${statusBadge.bg} flex items-center justify-center`}>
                          <span className={`text-xl ${statusBadge.text}`}>{typeInfo.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            {appointment.fullName}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                              {appointment.status}
                            </span>
                          </h3>
                          <p className="text-sm text-gray-600">{typeInfo.name}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{appointment.appointmentTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{appointment.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{appointment.phoneNumber}</span>
                        </div>
                      </div>

                      {appointment.preferredCountry && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                          <MapPin className="h-4 w-4" />
                          <span>Interested in: {appointment.preferredCountry}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                      <button
                        onClick={() => {
                          setViewingAppointment(appointment);
                          setViewModal(true);
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleEditAppointment(appointment)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                      
                      {/* Status Update Dropdown */}
                      {appointment.status !== 'Completed' && appointment.status !== 'Cancelled' && (
                        <div className="relative">
                          <select
                            value={appointment.status}
                            onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                            className="bg-green-100 hover:bg-green-200 text-green-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors appearance-none cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirm</option>
                            <option value="Completed">Complete</option>
                            <option value="Cancelled">Cancel</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-2xl relative">
              <h2 className="text-2xl font-bold text-white">
                {editMode ? 'Edit Appointment' : 'Add Appointment'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 text-white hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Appointment Type *
                  </label>
                  <select
                    value={formData.appointmentType}
                    onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="counseling">Study Abroad Counseling</option>
                    <option value="course-selection">Course Selection</option>
                    <option value="visa-guidance">Visa Guidance</option>
                    <option value="test-prep">Test Preparation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Appointment Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.appointmentTime}
                    onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Preferred Country (Optional)
                </label>
                <input
                  type="text"
                  value={formData.preferredCountry}
                  onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., USA, UK, Canada"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Any additional information..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  {editMode ? 'Update Appointment' : 'Add Appointment'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Appointment Modal */}
      {viewModal && viewingAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
                <button
                  onClick={() => {
                    setViewModal(false);
                    setViewingAppointment(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-900 font-medium">{viewingAppointment.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Appointment Type</label>
                  <p className="text-gray-900">{getAppointmentTypeInfo(viewingAppointment.appointmentType).name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{viewingAppointment.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{viewingAppointment.phoneNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{new Date(viewingAppointment.appointmentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                  <p className="text-gray-900">{viewingAppointment.appointmentTime}</p>
                </div>
              </div>

              {viewingAppointment.preferredCountry && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Country</label>
                  <p className="text-gray-900">{viewingAppointment.preferredCountry}</p>
                </div>
              )}

              {viewingAppointment.message && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 rounded-lg p-4 mt-1">
                    <p className="text-gray-700 whitespace-pre-wrap">{viewingAppointment.message}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(viewingAppointment.status).bg} ${getStatusBadge(viewingAppointment.status).text}`}>
                  {viewingAppointment.status}
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setViewModal(false);
                    setViewingAppointment(null);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;