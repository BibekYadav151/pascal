import React, { useState, useEffect } from 'react';

const AdminGallery = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    coverImage: '',
    images: []
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/gallery');
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleFilesSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setSelectedImages(validFiles);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    setUploading(true);
    const formData = new FormData();
    formData.append('galleryImage', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/upload/gallery-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          coverImage: data.data.url
        }));
        setSelectedFile(null);
        return data.data.url;
      } else {
        alert(data.message || 'Error uploading image');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async () => {
    if (selectedImages.length === 0) return [];

    setUploadingImages(true);
    const uploadedUrls = [];

    try {
      for (const file of selectedImages) {
        const formData = new FormData();
        formData.append('galleryImage', file);

        const response = await fetch('http://localhost:5000/api/upload/gallery-image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          uploadedUrls.push(data.data.url);
        } else {
          alert(`Error uploading ${file.name}`);
        }
      }

      if (uploadedUrls.length > 0) {
        const updatedImages = [...formData.images, ...uploadedUrls];
        setFormData(prev => ({
          ...prev,
          images: updatedImages
        }));
        setSelectedImages([]);
      }

      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
      return [];
    } finally {
      setUploadingImages(false);
    }
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      coverImage: '',
      images: []
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setSelectedImages([]);
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      coverImage: event.coverImage,
      images: event.images || []
    });
    setSelectedFile(null);
    setPreviewUrl(event.coverImage);
    setSelectedImages([]);
    setShowModal(true);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowImageModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.coverImage) {
      alert('Title and cover image are required');
      return;
    }

    let coverImage = formData.coverImage;
    if (selectedFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        coverImage = uploadedUrl;
      } else {
        return;
      }
    }

    const eventData = {
      title: formData.title,
      coverImage: coverImage,
      images: formData.images
    };

    try {
      const url = editingEvent
        ? `http://localhost:5000/api/gallery/${editingEvent.id}`
        : 'http://localhost:5000/api/gallery';

      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchEvents();
        handleCloseModal();
      } else {
        alert(data.message || 'Error saving event');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please try again.');
    }
  };

  const handleDelete = async (id, coverImage, images) => {
    if (window.confirm('Are you sure you want to delete this event? All images will be removed.')) {
      try {
        const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
          // Try to delete uploaded images from server
          const allImages = [coverImage, ...(images || [])];
          for (const imageUrl of allImages) {
            if (imageUrl && imageUrl.includes('/uploads/')) {
              try {
                const filename = imageUrl.split('/uploads/')[1];
                await fetch(`http://localhost:5000/api/upload/file/${filename}`, {
                  method: 'DELETE',
                });
              } catch (error) {
                console.warn('Could not delete uploaded file:', error);
              }
            }
          }
          
          await fetchEvents();
        } else {
          alert(data.message || 'Error deleting event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      }
    }
  };

  const handleRemoveImage = async (imageUrl) => {
    if (!editingEvent) return;

    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${editingEvent.id}/images`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          images: prev.images.filter(img => img !== imageUrl)
        }));
        await fetchEvents();
      } else {
        alert(data.message || 'Error removing image');
      }
    } catch (error) {
      console.error('Error removing image:', error);
      alert('Error removing image. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      coverImage: '',
      images: []
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setSelectedImages([]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
            <p className="text-gray-600">Create and manage event galleries</p>
          </div>

          <button
            onClick={handleAddEvent}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>➕</span> Add New Event
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleViewEvent(event)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-medium">
                    {event.images?.length || 0} images
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(event.createdAt)}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEvent(event);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(event.id, event.coverImage, event.images);
                      }}
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
            <p className="text-gray-500 text-lg">No events found. Create your first event gallery!</p>
          </div>
        )}
      </div>

      {/* Add/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
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
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event title"
                  required
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Cover Image *
                </label>
                
                {!selectedFile && !previewUrl ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Click to upload cover image</span>
                      <span className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={previewUrl || formData.coverImage}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl('');
                        setFormData({ ...formData, coverImage: '' });
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    {selectedFile && (
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={uploadImage}
                          disabled={uploading}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                          {uploading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              Upload Image
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Event Images */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Event Images
                </label>
                
                {/* Upload Multiple Images */}
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleFilesSelect}
                    className="hidden"
                    id="images-upload"
                  />
                  <label
                    htmlFor="images-upload"
                    className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Images
                  </label>
                  
                  {selectedImages.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedImages.length} image(s) selected
                      </p>
                      <button
                        type="button"
                        onClick={uploadMultipleImages}
                        disabled={uploadingImages}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        {uploadingImages ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Upload {selectedImages.length} Image(s)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Display Uploaded Images */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Event image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {editingEvent && (
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(imageUrl)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
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
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      {showImageModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setSelectedEvent(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[selectedEvent.coverImage, ...(selectedEvent.images || [])].map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`${selectedEvent.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(imageUrl, '_blank')}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminGallery;
