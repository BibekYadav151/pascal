import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui';
import { Upload, X, Edit3, Save, Plus, Image as ImageIcon } from 'lucide-react';

const AdminHero = () => {
  const { heroStats, heroImages, updateHeroStats, addHeroImage, removeHeroImage } = useApp();
  const [editingStats, setEditingStats] = useState(false);
  const [statsForm, setStatsForm] = useState({
    experience: '',
    students: '',
    satisfaction: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setStatsForm({
      experience: heroStats?.experience || '8+',
      students: heroStats?.students || '1,000+',
      satisfaction: heroStats?.satisfaction || '95%'
    });
  }, [heroStats]);

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    updateHeroStats({
      experience: statsForm.experience,
      students: statsForm.students,
      satisfaction: statsForm.satisfaction
    });
    setEditingStats(false);
  };

  const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    // Check if adding these files would exceed the 10 image limit
    const currentCount = heroImages ? heroImages.length : 0;
    if (currentCount + files.length > 10) {
      alert(`You can only upload up to 10 images. You currently have ${currentCount} images.`);
      return;
    }

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Compress the image first
        const compressedBlob = await compressImage(file);

        // Convert compressed blob to base64
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          addHeroImage(imageUrl);
        };
        reader.readAsDataURL(compressedBlob);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (imageUrl) => {
    if (window.confirm('Are you sure you want to remove this image?')) {
      removeHeroImage(imageUrl);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Hero Section Management</h1>
      </div>

      {/* Hero Stats Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Hero Statistics</h2>
          <button
            onClick={() => setEditingStats(!editingStats)}
            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              editingStats
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {editingStats ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Stats
              </>
            )}
          </button>
        </div>

        {editingStats ? (
          <form onSubmit={handleStatsSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={statsForm.experience}
                  onChange={(e) => setStatsForm({...statsForm, experience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 8+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Students Success
                </label>
                <input
                  type="text"
                  value={statsForm.students}
                  onChange={(e) => setStatsForm({...statsForm, students: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 1,000+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Satisfaction Rate
                </label>
                <input
                  type="text"
                  value={statsForm.satisfaction}
                  onChange={(e) => setStatsForm({...statsForm, satisfaction: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 95%"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">{heroStats?.experience || '8+'}</div>
              <div className="text-sm text-gray-600">years experience</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">{heroStats?.students || '1,000+'}</div>
              <div className="text-sm text-gray-600">students success</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-2">{heroStats?.satisfaction || '95%'}</div>
              <div className="text-sm text-gray-600">satisfied rate</div>
            </div>
          </div>
        )}
      </Card>

      {/* Hero Images Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Hero Images</h2>
            <p className="text-sm text-gray-600 mt-1">
              {heroImages ? heroImages.length : 0} of 10 images uploaded
            </p>
          </div>
          {(!heroImages || heroImages.length < 10) && (
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              <button
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  uploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Images
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {heroImages && heroImages.length > 0 ? (
            heroImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt={`Hero image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => handleRemoveImage(image)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  Image {index + 1}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hero images uploaded yet</p>
              <p className="text-sm text-gray-400 mt-2">Upload up to 10 images for auto-sliding carousel</p>
            </div>
          )}
        </div>

        {heroImages && heroImages.length > 1 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center text-blue-800">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs">i</span>
              </div>
              <div>
                <p className="font-medium">Auto-sliding enabled</p>
                <p className="text-sm text-blue-600">Multiple images will automatically slide every 4 seconds</p>
              </div>
            </div>
          </div>
        )}

        {heroImages && heroImages.length >= 10 && (
          <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center text-orange-800">
              <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs">!</span>
              </div>
              <div>
                <p className="font-medium">Maximum images reached</p>
                <p className="text-sm text-orange-600">You've reached the 10 image limit. Remove some images to add more.</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminHero;