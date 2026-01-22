import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const Offers = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/offers');
      const data = await response.json();
      if (data.success) {
        setOffers(data.data);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentOffers = offers.filter(offer => offer.status === 'current');
  const upcomingOffers = offers.filter(offer => offer.status === 'upcoming');
  const displayedOffers = activeTab === 'current' ? currentOffers : upcomingOffers;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return as-is if not a valid date
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="page-top bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center">
            <h1 className="text-display-lg text-gray-900 mb-4">
              Exclusive Offers Just for You
            </h1>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto">
              Take advantage of our special offers and save big on your educational journey.
              From test preparation to complete study abroad packages, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="section-spacing bg-gray-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('current')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'current'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Current Offers
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'upcoming'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Upcoming Offers
              </button>
            </div>
          </div>

          {/* Offers Grid - Banner Style */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : displayedOffers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {displayedOffers.map((offer, index) => (
              <div
                key={offer.id}
                className={`group relative ${offer.bgColor} rounded-3xl p-8 shadow-2xl transition-all duration-500 animate-fade-in-up overflow-hidden min-h-[400px] flex flex-col justify-between`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Top Section */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold border border-white/30">
                        {offer.category}
                      </div>
                    </div>
                    
                    {/* Discount Badge - Large and Prominent */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/30 blur-xl rounded-full"></div>
                      <div className="relative bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        <div className="text-center">
                          <div className="text-3xl font-black text-gray-900">
                            {offer.discount}
                          </div>
                          <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                            OFF
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                      {offer.title}
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-6 drop-shadow-md line-clamp-3">
                      {offer.description}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex flex-col items-center gap-2 pt-6 border-t border-white/20">
                    {offer.startDate && activeTab === 'upcoming' && (
                      <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          Starts: <span className="font-bold">{formatDate(offer.startDate)}</span>
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-white/90">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Valid until: <span className="font-bold">{offer.validUntil}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v1M12 8.5l-3 3m6 0l-3-3m3 3V21" />
                </svg>
              </div>
              <h3 className="text-title-md text-gray-900 mb-2">No offers found</h3>
              <p className="text-body text-gray-600">
                {activeTab === 'current' 
                  ? 'No current offers available at the moment'
                  : 'No upcoming offers scheduled'}
              </p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Offers;