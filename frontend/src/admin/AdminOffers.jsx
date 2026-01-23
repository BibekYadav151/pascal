import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useOffers, useCreateOffer, useUpdateOffer, useDeleteOffer } from '../hooks/useOffers';

const AdminOffers = () => {
  const { data: offersResponse, isLoading: loading } = useOffers();
  const offers = offersResponse?.data || [];

  const createOfferMutation = useCreateOffer();
  const updateOfferMutation = useUpdateOffer();
  const deleteOfferMutation = useDeleteOffer();

  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    startDate: '',
    validUntil: '',
    category: '',
    bgColor: 'bg-orange-500',
    terms: []
  });

  const [newTerm, setNewTerm] = useState('');

  const bgColorOptions = [
    { value: 'bg-orange-500', label: 'Orange' },
    { value: 'bg-blue-500', label: 'Blue' },
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-yellow-500', label: 'Yellow' },
    { value: 'bg-cyan-500', label: 'Cyan' },
    { value: 'bg-purple-500', label: 'Purple' },
    { value: 'bg-red-500', label: 'Red' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-indigo-500', label: 'Indigo' },
    { value: 'bg-teal-500', label: 'Teal' }
  ];

  const categoryOptions = ['Test Prep', 'Package', 'Group', 'Referral', 'Seasonal', 'Partnership', 'Other'];

  // Removed fetchEvents useEffect

  const handleAddOffer = () => {
    setEditingOffer(null);
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      title: '',
      description: '',
      discount: '',
      startDate: today,
      validUntil: '',
      category: '',
      bgColor: 'bg-orange-500',
      terms: []
    });
    setNewTerm('');
    setShowModal(true);
  };

  const handleEditOffer = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discount: offer.discount,
      startDate: offer.startDate || new Date().toISOString().split('T')[0],
      validUntil: offer.validUntil,
      category: offer.category,
      bgColor: offer.bgColor || 'bg-orange-500',
      terms: offer.terms || []
    });
    setNewTerm('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.discount || !formData.category || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      let response;
      if (editingOffer) {
        response = await updateOfferMutation.mutateAsync({ id: editingOffer.id, data: formData });
      } else {
        response = await createOfferMutation.mutateAsync(formData);
      }

      if (response.success) {
        handleCloseModal();
      } else {
        alert(response.message || 'Error saving offer');
      }
    } catch (error) {
      console.error('Error saving offer:', error);
      alert('Error saving offer. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        const response = await deleteOfferMutation.mutateAsync(id);

        if (response.success) {
          // fetchOffers invalidated automatically
        } else {
          alert(response.message || 'Error deleting offer');
        }
      } catch (error) {
        console.error('Error deleting offer:', error);
        alert('Error deleting offer. Please try again.');
      }
    }
  };

  const handleAddTerm = () => {
    if (newTerm.trim()) {
      setFormData({
        ...formData,
        terms: [...formData.terms, newTerm.trim()]
      });
      setNewTerm('');
    }
  };

  const handleRemoveTerm = (index) => {
    setFormData({
      ...formData,
      terms: formData.terms.filter((_, i) => i !== index)
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOffer(null);
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      title: '',
      description: '',
      discount: '',
      startDate: today,
      validUntil: '',
      category: '',
      bgColor: 'bg-orange-500',
      terms: []
    });
    setNewTerm('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return as-is if not a valid date
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const currentOffers = offers.filter(offer => offer.status === 'current');
  const upcomingOffers = offers.filter(offer => offer.status === 'upcoming');
  const expiredOffers = offers.filter(offer => offer.status === 'expired');

  return (
    <>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Offer Management</h1>
            <p className="text-gray-600">Create and manage special offers</p>
          </div>

          <button
            onClick={handleAddOffer}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>➕</span> Add New Offer
          </button>
        </div>

        {/* Offers Display */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Current Offers */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Offers</h2>
              {currentOffers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className={`relative ${offer.bgColor || 'bg-orange-500'} rounded-2xl p-6 shadow-lg overflow-hidden min-h-[300px] flex flex-col justify-between`}
                    >
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold border border-white/30">
                            {offer.category}
                          </div>
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/30 blur-xl rounded-full"></div>
                            <div className="relative bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl">
                              <div className="text-center">
                                <div className="text-2xl font-black text-gray-900">
                                  {offer.discount}
                                </div>
                                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                  OFF
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center mb-4">
                          <h3 className="text-2xl font-black text-white mb-2 leading-tight drop-shadow-lg">
                            {offer.title}
                          </h3>
                          <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                            {offer.description}
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-2 pt-4 border-t border-white/20">
                          {offer.startDate && (
                            <div className="flex items-center gap-2 text-white/90">
                              <Calendar className="w-4 h-4" />
                              <span className="text-xs font-medium">
                                Started: <span className="font-bold">{formatDate(offer.startDate)}</span>
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-white/90">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              Valid until: <span className="font-bold">{offer.validUntil}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons Overlay */}
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditOffer(offer)}
                          className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <p className="text-gray-500 text-lg">No current offers found. Create your first offer!</p>
                </div>
              )}
            </div>

            {/* Upcoming Offers */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Offers</h2>
              {upcomingOffers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className={`relative ${offer.bgColor || 'bg-cyan-500'} rounded-2xl p-6 shadow-lg overflow-hidden min-h-[300px] flex flex-col justify-between`}
                    >
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold border border-white/30">
                            {offer.category}
                          </div>
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/30 blur-xl rounded-full"></div>
                            <div className="relative bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl">
                              <div className="text-center">
                                <div className="text-2xl font-black text-gray-900">
                                  {offer.discount}
                                </div>
                                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                  OFF
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center mb-4">
                          <h3 className="text-2xl font-black text-white mb-2 leading-tight drop-shadow-lg">
                            {offer.title}
                          </h3>
                          <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                            {offer.description}
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-2 pt-4 border-t border-white/20">
                          {offer.startDate && (
                            <div className="flex items-center gap-2 text-white/90">
                              <Calendar className="w-4 h-4" />
                              <span className="text-xs font-medium">
                                Starts: <span className="font-bold">{formatDate(offer.startDate)}</span>
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-white/90">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              Valid until: <span className="font-bold">{offer.validUntil}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons Overlay */}
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditOffer(offer)}
                          className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <p className="text-gray-500 text-lg">No upcoming offers found. Create your first upcoming offer!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingOffer ? 'Edit Offer' : 'Create New Offer'}
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
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter offer title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                  placeholder="Enter offer description"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Discount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Discount *
                  </label>
                  <input
                    type="text"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 20% or ₹5,000"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => {
                      const startDate = e.target.value;
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const start = new Date(startDate);
                      start.setHours(0, 0, 0, 0);
                      const status = start <= today ? 'current' : 'upcoming';
                      setFormData({ ...formData, startDate, status });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.startDate && (() => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const start = new Date(formData.startDate);
                      start.setHours(0, 0, 0, 0);
                      const status = start <= today ? 'Current' : 'Upcoming';
                      return `Status will be: ${status}`;
                    })()}
                  </p>
                </div>

                {/* Valid Until */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    value={formData.validUntil && formData.validUntil !== 'Ongoing' ? formData.validUntil : ''}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value || 'Ongoing' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={formData.validUntil === 'Ongoing'}
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="ongoing"
                      checked={formData.validUntil === 'Ongoing'}
                      onChange={(e) => setFormData({ ...formData, validUntil: e.target.checked ? 'Ongoing' : '' })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="ongoing" className="text-sm text-gray-700 cursor-pointer">
                      Ongoing (no expiration)
                    </label>
                  </div>
                </div>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Background Color
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {bgColorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, bgColor: color.value })}
                      className={`relative ${color.value} h-12 rounded-lg border-2 transition-all ${formData.bgColor === color.value
                          ? 'border-gray-900 scale-110 shadow-lg'
                          : 'border-transparent hover:border-gray-300'
                        }`}
                    >
                      {formData.bgColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Terms & Conditions
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTerm();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a term and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddTerm}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.terms.length > 0 && (
                  <div className="space-y-2">
                    {formData.terms.map((term, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                        <span className="text-sm text-gray-700">{term}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTerm(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                  {editingOffer ? 'Update Offer' : 'Create Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOffers;
