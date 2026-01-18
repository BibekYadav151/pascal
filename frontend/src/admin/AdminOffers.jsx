import React, { useState, useEffect } from 'react';
import { Card, AnimatedButton } from '../components/ui';

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    validUntil: '',
    category: '',
    terms: '',
    status: 'active',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/offers');
      if (response.ok) {
        const data = await response.json();
        setOffers(data);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingOffer 
        ? `http://localhost:5000/api/offers/${editingOffer.id}`
        : 'http://localhost:5000/api/offers';
      
      const method = editingOffer ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          terms: formData.terms.split('\n').filter(term => term.trim())
        })
      });

      if (response.ok) {
        await fetchOffers();
        setIsEditing(false);
        setEditingOffer(null);
        setFormData({
          title: '',
          description: '',
          discount: '',
          validUntil: '',
          category: '',
          terms: '',
          status: 'active',
          imageUrl: ''
        });
        setImagePreview('');
        alert(`Offer ${editingOffer ? 'updated' : 'created'} successfully!`);
      } else {
        alert(`Failed to ${editingOffer ? 'update' : 'create'} offer`);
      }
    } catch (error) {
      console.error('Error saving offer:', error);
      alert(`Error ${editingOffer ? 'updating' : 'creating'} offer`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title || '',
      description: offer.description || '',
      discount: offer.discount || '',
      validUntil: offer.validUntil || '',
      category: offer.category || '',
      terms: offer.terms ? offer.terms.join('\n') : '',
      status: offer.status || 'active',
      imageUrl: offer.imageUrl || ''
    });
    setImagePreview(offer.imageUrl || '');
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm && window.confirm('Are you sure you want to delete this offer?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/offers/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          await fetchOffers();
          alert('Offer deleted successfully!');
        } else {
          alert('Failed to delete offer');
        }
      } catch (error) {
        console.error('Error deleting offer:', error);
        alert('Error deleting offer');
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingOffer(null);
    setFormData({
      title: '',
      description: '',
      discount: '',
      validUntil: '',
      category: '',
      terms: '',
      status: 'active',
      imageUrl: ''
    });
    setImagePreview('');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('offerImage', file);

      const response = await fetch('http://localhost:5000/api/upload/offer-image', {
        method: 'POST',
        body: formDataUpload
      });

      if (response.ok) {
        const result = await response.json();
        setFormData({ ...formData, imageUrl: result.data.url });
        setImagePreview(result.data.url);
        alert('Image uploaded successfully!');
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    setImagePreview('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Offers Management</h2>
          <p className="text-gray-600">Manage your special offers and discounts</p>
        </div>
        <AnimatedButton
          onClick={() => setIsEditing(!isEditing)}
          variant="primary"
          size="md"
        >
          {isEditing ? 'Cancel' : 'Add New Offer'}
        </AnimatedButton>
      </div>

      {/* Offers List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {offers.map((offer) => (
          <Card key={offer.id} className="p-0 overflow-hidden">
            {offer.imageUrl ? (
              <div className="h-40 bg-gray-100">
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className="h-40 bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
                <span className="text-4xl">🎁</span>
              </div>
            )}

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {offer.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                      {offer.discount} OFF
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      offer.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : offer.status === 'upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {offer.status}
                    </span>
                    {offer.imageUrl && (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                        has image
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {offer.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-900 font-medium">{offer.category}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Valid Until:</span>
                  <span className="text-gray-900 font-medium">{offer.validUntil}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <AnimatedButton
                  onClick={() => handleEdit(offer)}
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                >
                  Edit
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => handleDelete(offer.id)}
                  variant="secondary"
                  size="sm"
                  className="bg-red-100 hover:bg-red-200 text-red-700"
                >
                  Delete
                </AnimatedButton>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Form */}
      {isEditing && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {editingOffer ? 'Edit Offer' : 'Add New Offer'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Offer title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Test Prep, Package, Group"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Offer description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount *
                </label>
                <input
                  type="text"
                  required
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 20% or ₹5,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Until *
                </label>
                <input
                  type="text"
                  required
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., December 31, 2025"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Offer Image
              </label>
              <div className="space-y-4">
                {imagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Offer preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <label className="cursor-pointer flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <div className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-500 transition-colors">
                      {uploading ? (
                        <span className="text-gray-600">Uploading...</span>
                      ) : (
                        <span className="text-gray-600">
                          {imagePreview ? 'Change Image' : 'Upload Image from Device'}
                        </span>
                      )}
                    </div>
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, imageUrl: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Or enter image URL"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Terms (one per line)
              </label>
              <textarea
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Term 1&#10;Term 2&#10;Term 3"
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
                <option value="upcoming">Upcoming</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex gap-4">
              <AnimatedButton
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
              >
                {loading ? 'Saving...' : (editingOffer ? 'Update Offer' : 'Create Offer')}
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

export default AdminOffers;