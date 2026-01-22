import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

const AdminBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
    mapUrl: '#',
    isMain: false
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/branches');
      const data = await response.json();
      if (data.success) {
        setBranches(data.data);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBranch = () => {
    setEditingBranch(null);
    setFormData({
      name: '',
      location: '',
      address: '',
      phone: '',
      email: '',
      hours: 'Sun-Fri: 9:00 AM - 6:00 PM',
      mapUrl: '#',
      isMain: false
    });
    setShowModal(true);
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      location: branch.location,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      hours: branch.hours,
      mapUrl: branch.mapUrl || '#',
      isMain: branch.isMain || false
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.address || !formData.phone || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const url = editingBranch
        ? `http://localhost:5000/api/branches/${editingBranch.id}`
        : 'http://localhost:5000/api/branches';

      const method = editingBranch ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchBranches();
        handleCloseModal();
      } else {
        alert(data.message || 'Error saving branch');
      }
    } catch (error) {
      console.error('Error saving branch:', error);
      alert('Error saving branch. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/branches/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
          await fetchBranches();
        } else {
          alert(data.message || 'Error deleting branch');
        }
      } catch (error) {
        console.error('Error deleting branch:', error);
        alert('Error deleting branch. Please try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBranch(null);
    setFormData({
      name: '',
      location: '',
      address: '',
      phone: '',
      email: '',
      hours: 'Sun-Fri: 9:00 AM - 6:00 PM',
      mapUrl: '#',
      isMain: false
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Branch Management</h1>
            <p className="text-gray-600">Manage branch locations and contact information</p>
          </div>

          <button
            onClick={handleAddBranch}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>➕</span> Add New Branch
          </button>
        </div>

        {/* Branches Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : branches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="space-y-4">
                  {/* Branch Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {branch.name}
                        </h3>
                        {branch.isMain && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                            Main
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        {branch.location}
                      </div>
                    </div>
                  </div>

                  {/* Branch Details */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{branch.address}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{branch.phone}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{branch.email}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{branch.hours}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEditBranch(branch)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No branches found. Create your first branch!</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBranch ? 'Edit Branch' : 'Create New Branch'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Branch Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Main Branch - Kathmandu"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Kathmandu, Nepal"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                  placeholder="Full street address"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+977-1-44XXXXXX"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="info@pascalinstitute.edu.np"
                    required
                  />
                </div>
              </div>

              {/* Hours */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Sun-Fri: 9:00 AM - 6:00 PM"
                />
              </div>

              {/* Map URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Map URL
                </label>
                <input
                  type="url"
                  value={formData.mapUrl}
                  onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://maps.google.com/..."
                />
              </div>

              {/* Is Main Branch */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isMain"
                  checked={formData.isMain}
                  onChange={(e) => setFormData({ ...formData, isMain: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isMain" className="text-sm font-semibold text-gray-900">
                  Set as Main Branch
                </label>
                <p className="text-xs text-gray-500">
                  (Only one branch can be marked as main)
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingBranch ? 'Update Branch' : 'Create Branch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBranches;
