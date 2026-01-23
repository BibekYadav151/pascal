import React, { useState } from 'react';
import { useUniversities, useCreateUniversity, useUpdateUniversity, useDeleteUniversity } from '../hooks/usePrograms';

const AdminUniversities = () => {
  const { data: universitiesResponse, isLoading: loadingUniversities } = useUniversities();
  const universities = universitiesResponse?.data || [];

  const createUniversityMutation = useCreateUniversity();
  const updateUniversityMutation = useUpdateUniversity();
  const deleteUniversityMutation = useDeleteUniversity();

  const [showModal, setShowModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    location: '',
    website: '',
    logo: '',
    status: 'Active',
    isPartner: false
  });

  const handleAddUniversity = () => {
    setEditingUniversity(null);
    setLogoPreview(null);
    setFormData({
      name: '',
      country: '',
      location: '',
      website: '',
      logo: '',
      status: 'Active',
      isPartner: false
    });
    setShowModal(true);
  };

  const handleEditUniversity = (uni) => {
    setEditingUniversity(uni);
    setLogoPreview(uni.logo || null);
    setFormData({
      name: uni.name,
      country: uni.country,
      location: uni.location,
      website: uni.website,
      logo: uni.logo,
      status: uni.status,
      isPartner: uni.isPartner || false
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUniversity) {
        await updateUniversityMutation.mutateAsync({ id: editingUniversity.id, data: formData });
      } else {
        await createUniversityMutation.mutateAsync(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving university:', error);
      alert('Error saving university');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUniversity(null);
    setLogoPreview(null);
    setFormData({
      name: '',
      country: '',
      location: '',
      website: '',
      logo: '',
      status: 'Active',
      isPartner: false
    });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB');
      return;
    }

    setUploadingLogo(true);

    const formDataToUpload = new FormData();
    formDataToUpload.append('logo', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload/university-logo', {
        method: 'POST',
        body: formDataToUpload,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, logo: data.data.url });
        setLogoPreview(data.data.url);
      } else {
        alert('Failed to upload logo: ' + data.message);
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Failed to upload logo. Please try again.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleRemoveLogo = () => {
    setFormData({ ...formData, logo: '' });
    setLogoPreview(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await deleteUniversityMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting university:', error);
        alert('Error deleting university');
      }
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">University Management</h1>
            <p className="text-gray-600">Manage partner universities</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddUniversity}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>➕</span> Add University
            </button>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <div key={uni.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-3xl overflow-hidden">
                    {uni.logo ? (
                      <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span>🎓</span>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${uni.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {uni.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{uni.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>🌍 {uni.country}</p>
                  <p>📍 {uni.location}</p>
                  {uni.website && (
                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      🔗 Visit Website
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditUniversity(uni)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(uni.id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {universities.length === 0 && (
            <div className="col-span-3 bg-white rounded-xl p-12 text-center text-gray-500 shadow-lg">
              No universities added yet. Click "Add University" to create one.
            </div>
          )}
        </div>

        {/* Add/Edit University Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold text-white">
                  {editingUniversity ? 'Edit University' : 'Add University'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    University Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., University of Toronto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Canada"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Toronto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., https://www.utoronto.ca"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    University Logo
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Upload a logo to display in the partner universities section (Max 5MB)
                  </p>

                  {logoPreview ? (
                    <div className="space-y-3">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-300">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove Logo
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={uploadingLogo}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {uploadingLogo && (
                        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                          <span className="text-sm text-gray-600">Uploading...</span>
                        </div>
                      )}
                    </div>
                  )}
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.isPartner}
                      onChange={(e) => setFormData({ ...formData, isPartner: e.target.checked })}
                      className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    Add to Partner Universities
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Check this to display this university in the home page partner universities section
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    {editingUniversity ? 'Update University' : 'Add University'}
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
      </div>
    </>
  );
};

export default AdminUniversities;
