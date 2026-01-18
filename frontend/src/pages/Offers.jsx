import React, { useState, useEffect } from 'react';
import { Gift, Calendar } from 'lucide-react';

const Offers = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [activeOffers, setActiveOffers] = useState([]);
  const [upcomingOffers, setUpcomingOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const [activeResponse, upcomingResponse] = await Promise.all([
        fetch('http://localhost:5000/api/offers/active'),
        fetch('http://localhost:5000/api/offers/upcoming')
      ]);

      if (activeResponse.ok) {
        const activeData = await activeResponse.json();
        setActiveOffers(activeData);
      }

      if (upcomingResponse.ok) {
        const upcomingData = await upcomingResponse.json();
        setUpcomingOffers(upcomingData);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const offers = activeTab === 'active' ? activeOffers : upcomingOffers;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="page-top bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-6">
              <Gift className="w-4 h-4 mr-2" />
              Special Offers & Discounts
            </div>
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
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto container-spacing">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'active'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Active Offers
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

          {/* Offers Grid */}
          <div className="mb-12">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading offers...</p>
              </div>
            ) : offers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offers.map((offer, index) => (
                  <div
                    key={offer.id}
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up border border-gray-100 hover:border-orange-200 overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Simple card design without gradient hover effects */}
                    <div className="relative z-10">
                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        {offer.discount} OFF
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors duration-300">
                        {offer.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-sm mb-6 line-clamp-3">
                        {offer.description}
                      </p>

                      {/* Category Tag */}
                      <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200 mb-4">
                        {offer.category}
                      </div>

                      {/* Validity */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          <span className="font-bold">Valid:</span> {offer.validUntil}
                        </span>
                      </div>

                      {/* Terms (if available) */}
                      {offer.terms && offer.terms.length > 0 && (
                        <div className="border-t border-gray-100 pt-4">
                          <h4 className="text-xs font-semibold text-gray-700 mb-2">Terms:</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {offer.terms.slice(0, 2).map((term, termIndex) => (
                              <li key={termIndex} className="flex items-start">
                                <span className="text-orange-500 mr-1">•</span>
                                {term}
                              </li>
                            ))}
                            {offer.terms.length > 2 && (
                              <li className="text-gray-500 italic">
                                +{offer.terms.length - 2} more terms
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎁</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No {activeTab === 'active' ? 'active' : 'upcoming'} offers available
                </h3>
                <p className="text-gray-600">
                  Check back later for new offers and discounts!
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Offers;