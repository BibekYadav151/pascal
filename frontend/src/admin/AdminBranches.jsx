import React, { useState, useEffect } from 'react';
import { Card, AnimatedButton } from '../components/ui';

const AdminBranches = () => {
  const [branches, setBranches] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    coordinates: {
      lat: '',
      lng: ''
    },
    workingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    status: 'active'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/branches');
      if (response.ok) {
        const data = await response.json();
        setBranches(data);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingBranch 
        ? `http://localhost:5000/api/branches/${editingBranch.id}`
        : 'http://localhost:5000/api/branches';
      
      const method = editingBranch ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchBranches();
        setIsEditing(false);
        setEditingBranch(null);
        setFormData({
          name: '',
          address: '',
          phone: '',
          email: '',
          coordinates: {
            lat: '',
            lng: ''
          },
          workingHours: {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
          },
          status: 'active'
        });
        alert(`Branch ${editingBranch ? 'updated' : 'created'} successfully!`);
      } else {
        alert(`Failed to ${editingBranch ? 'update' : 'create'} branch`);
      }
    } catch (error) {
      console.error('Error saving branch:', error);
      alert(`Error ${editingBranch ? 'updating' : 'creating'} branch`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name || '',
      address: branch.address || '',
      phone: branch.phone || '',
      email: branch.email || '',
      coordinates: branch.coordinates || { lat: '', lng: '' },
      workingHours: branch.workingHours || {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
      },
      status: branch.status || 'active'
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm && window.confirm('Are you sure you want to delete this branch?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/branches/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          await fetchBranches();
          alert('Branch deleted successfully!');
        } else {
          alert('Failed to delete branch');
        }
      } catch (error) {
        console.error('Error deleting branch:', error);
        alert('Error deleting branch');
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingBranch(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      coordinates: {
        lat: '',
        lng: ''
      },
      workingHours: {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
      },
      status: 'active'
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Branches Management</h2>
          <p className="text-gray-600">Manage your office branches and contact information</p>
        </div>
        <AnimatedButton
          onClick={() => setIsEditing(!isEditing)}
          variant="primary"
          size="md"
        >
          {isEditing ? 'Cancel' : 'Add New Branch'}
        </AnimatedButton>
      </div>

      {/* Branches List */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {branches.map((branch) => (
          <Card key={branch.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {branch.name}
                </h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  branch.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {branch.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-gray-500 text-sm">📍</span>
                <span className="text-gray-700 text-sm">{branch.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">📞</span>
                <span className="text-gray-700 text-sm">{branch.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">✉️</span>
                <span className="text-gray-700 text-sm">{branch.email}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <AnimatedButton
                onClick={() => handleEdit(branch)}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                Edit
              </AnimatedButton>
              <AnimatedButton
                onClick={() => handleDelete(branch.id)}
                variant="secondary"
                size="sm"
                className="bg-red-100 hover:bg-red-200 text-red-700"
              >
                Delete
              </AnimatedButton>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Form */}
      {isEditing && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {editingBranch ? 'Edit Branch' : 'Add New Branch'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Main Office, Branch Office"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
                placeholder="Full address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+977-1-44XXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="branch@pascalinstitute.edu.np"
                />
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Working Hours
              </label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.workingHours).map(([day, hours]) => (
                  <div key={day}>
                    <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                      {day}
                    </label>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => setFormData({
                        ...formData,
                        workingHours: {
                          ...formData.workingHours,
                          [day]: e.target.value
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <AnimatedButton
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
              >
                {loading ? 'Saving...' : (editingBranch ? 'Update Branch' : 'Create Branch')}
              </AnimatedButton>
              <AnimatedButton
                type="button"
                onClick={handleCancel}
                variant="secondary"
                size="md"
              >
                Cancel
              </AnimatedButton>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default AdminBranches;