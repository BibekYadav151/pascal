import React, { useState, useEffect } from 'react';
import { Card, AnimatedButton } from '../components/ui';

const AdminHero = () => {
  const [hero, setHero] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    buttonText1: '',
    buttonText2: '',
    buttonLink1: '',
    buttonLink2: '',
    images: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hero/active');
      if (response.ok) {
        const data = await response.json();
        setHero(data);
        setFormData({
          title: data.title || '',
          description: data.description || '',
          buttonText1: data.buttonText1 || '',
          buttonText2: data.buttonText2 || '',
          buttonLink1: data.buttonLink1 || '',
          buttonLink2: data.buttonLink2 || '',
          images: data.images || []
        });
      }
    } catch (error) {
      console.error('Error fetching hero:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/hero/active', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedHero = await response.json();
        setHero(updatedHero);
        setIsEditing(false);
        alert('Hero content updated successfully!');
      } else {
        alert('Failed to update hero content');
      }
    } catch (error) {
      console.error('Error updating hero:', error);
      alert('Error updating hero content');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    setLoading(true);
    const uploadedImages = [];

    try {
      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append('heroImage', file);

        const response = await fetch('http://localhost:5000/api/upload/hero-image', {
          method: 'POST',
          body: formDataUpload
        });

        if (response.ok) {
          const result = await response.json();
          uploadedImages.push({
            url: result.data.url,
            alt: file.name.split('.')[0]
          });
        } else {
          console.error('Failed to upload image:', file.name);
        }
      }

      setFormData({
        ...formData,
        images: [...formData.images, ...uploadedImages]
      });

      alert(`Successfully uploaded ${uploadedImages.length} image(s)`);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images');
    } finally {
      setLoading(false);
    }
  };

  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { url: '', alt: '' }]
    });
  };

  const updateImage = (index, field, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index][field] = value;
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
          <p className="text-gray-600">Manage your homepage hero section content</p>
        </div>
        <AnimatedButton
          onClick={() => setIsEditing(!isEditing)}
          variant="primary"
          size="md"
        >
          {isEditing ? 'Cancel' : 'Edit Hero'}
        </AnimatedButton>
      </div>

      {/* Preview */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Hero</h3>
        {hero && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{hero.title}</h1>
            <p className="text-gray-700 mb-6">{hero.description}</p>
            <div className="flex gap-4">
              {hero.buttonText1 && (
                <AnimatedButton variant="primary" size="md">
                  {hero.buttonText1}
                </AnimatedButton>
              )}
              {hero.buttonText2 && (
                <AnimatedButton variant="secondary" size="md">
                  {hero.buttonText2}
                </AnimatedButton>
              )}
            </div>
            {hero.images && hero.images.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-gray-600">Images: {hero.images.length}</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit Hero Content</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Hero title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Hero description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 1 Text
                </label>
                <input
                  type="text"
                  value={formData.buttonText1}
                  onChange={(e) => setFormData({ ...formData, buttonText1: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="First button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 1 Link
                </label>
                <input
                  type="text"
                  value={formData.buttonLink1}
                  onChange={(e) => setFormData({ ...formData, buttonLink1: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/contact"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 2 Text
                </label>
                <input
                  type="text"
                  value={formData.buttonText2}
                  onChange={(e) => setFormData({ ...formData, buttonText2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Second button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 2 Link
                </label>
                <input
                  type="text"
                  value={formData.buttonLink2}
                  onChange={(e) => setFormData({ ...formData, buttonLink2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="/courses"
                />
              </div>
            </div>

            {/* Images Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Hero Images
                </label>
                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={loading}
                    />
                    <AnimatedButton
                      type="button"
                      variant="primary"
                      size="sm"
                      disabled={loading}
                    >
                      {loading ? 'Uploading...' : 'Upload from Device'}
                    </AnimatedButton>
                  </label>
                  <AnimatedButton
                    type="button"
                    onClick={addImage}
                    variant="secondary"
                    size="sm"
                  >
                    Add by URL
                  </AnimatedButton>
                </div>
              </div>

              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                  {image.url && (
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={image.url}
                        alt={image.alt || 'Preview'}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={image.url}
                      onChange={(e) => updateImage(index, 'url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                      placeholder="Image URL"
                    />
                    <input
                      type="text"
                      value={image.alt}
                      onChange={(e) => updateImage(index, 'alt', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Alt text"
                    />
                  </div>
                  <AnimatedButton
                    type="button"
                    onClick={() => removeImage(index)}
                    variant="secondary"
                    size="sm"
                    className="bg-red-100 hover:bg-red-200 text-red-700"
                  >
                    Remove
                  </AnimatedButton>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <AnimatedButton
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Hero'}
              </AnimatedButton>
              <AnimatedButton
                type="button"
                onClick={() => setIsEditing(false)}
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

export default AdminHero;