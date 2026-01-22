import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gallery");
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedImageIndex(0);
    setShowLightbox(true);
  };

  const handleCloseLightbox = () => {
    setShowLightbox(false);
    setSelectedEvent(null);
    setSelectedImageIndex(0);
  };

  const handleNextImage = () => {
    if (!selectedEvent) return;
    const allImages = [selectedEvent.coverImage, ...(selectedEvent.images || [])];
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    if (!selectedEvent) return;
    const allImages = [selectedEvent.coverImage, ...(selectedEvent.images || [])];
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="page-top bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center">
            <h1 className="text-display-lg text-gray-900 mb-4">Event Gallery</h1>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto">
              Explore our events and memorable moments captured in photos
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto container-spacing">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading gallery...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => {
                const totalImages = 1 + (event.images?.length || 0);
                return (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Cover Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 text-white">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            {totalImages} {totalImages === 1 ? "image" : "images"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-title-md text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-body-sm text-gray-500">
                        {formatDate(event.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-title-md text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-body text-gray-600">
                Check back later for upcoming events
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {showLightbox && selectedEvent && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Event Title */}
            <div className="absolute top-4 left-4 z-10">
              <h2 className="text-2xl font-bold text-white mb-1">
                {selectedEvent.title}
              </h2>
              <p className="text-sm text-white/80">
                {formatDate(selectedEvent.createdAt)}
              </p>
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                {selectedImageIndex + 1} / {1 + (selectedEvent.images?.length || 0)}
              </div>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              {(() => {
                const allImages = [
                  selectedEvent.coverImage,
                  ...(selectedEvent.images || []),
                ];
                return (
                  <>
                    <img
                      src={allImages[selectedImageIndex]}
                      alt={`${selectedEvent.title} - Image ${selectedImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />

                    {/* Navigation Arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Thumbnail Strip */}
            {selectedEvent.images && selectedEvent.images.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg overflow-x-auto max-w-[90vw]">
                  {[
                    selectedEvent.coverImage,
                    ...(selectedEvent.images || []),
                  ].map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-orange-500 scale-110"
                          : "border-transparent hover:border-white/50"
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
