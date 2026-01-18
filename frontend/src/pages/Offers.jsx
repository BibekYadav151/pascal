import React, { useState, useEffect } from 'react';
import { Gift, Calendar, Tag, Clock, Check, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="page-top bg-gradient-to-r from-orange-50 via-purple-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float animation-delay-700"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 text-orange-800 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Special Offers & Exclusive Discounts
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">Dream Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Take advantage of our exclusive offers and save big on your educational journey.
              From test preparation to complete study abroad packages, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="section-spacing bg-transparent relative">
        <div className="max-w-7xl mx-auto container-spacing">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-gray-100">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'active'
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Active Offers
                </span>
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Upcoming Offers
                </span>
              </button>
            </div>
          </div>

          {/* Offers Grid */}
          <div className="mb-12">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-600 border-t-transparent"></div>
                </div>
                <p className="text-gray-600 text-lg font-medium">Loading amazing offers...</p>
              </div>
            ) : offers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offers.map((offer, index) => (
                  <div
                    key={offer.id}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200 animate-fade-in-up transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-orange-50 to-blue-50">
                      {/* Placeholder (always rendered; image sits above if available) */}
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Gift className="w-20 h-20 text-orange-400 mx-auto mb-2" />
                          <p className="text-orange-600 font-semibold">Special Offer</p>
                        </div>
                      </div>

                      {offer.imageUrl && (
                        <img
                          src={offer.imageUrl}
                          alt={offer.title}
                          className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      
                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white px-4 py-2 rounded-2xl font-bold text-lg shadow-xl transform rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
                          {offer.discount} OFF
                        </div>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      {/* Category Tag */}
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-orange-600" />
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold border border-orange-200">
                          {offer.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 min-h-[56px]">
                        {offer.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 min-h-[60px]">
                        {offer.description}
                      </p>

                      {/* Validity */}
                      <div className="flex items-center justify-between pt-2 pb-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500 font-medium">Valid until</span>
                        </div>
                        <span className="text-gray-900 font-bold text-sm">{offer.validUntil}</span>
                      </div>

                      {/* Terms Section */}
                      {offer.terms && offer.terms.length > 0 && (
                        <div className="border-t border-gray-100 pt-4 space-y-2">
                          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                            <Check className="w-3 h-3" />
                            Key Terms
                          </h4>
                          <ul className="space-y-1.5">
                            {offer.terms.slice(0, 3).map((term, termIndex) => (
                              <li key={termIndex} className="flex items-start text-xs text-gray-600">
                                <span className="text-orange-500 mr-2 mt-0.5">✓</span>
                                <span className="leading-relaxed">{term}</span>
                              </li>
                            ))}
                            {offer.terms.length > 3 && (
                              <li className="text-xs text-orange-600 font-semibold ml-5">
                                +{offer.terms.length - 3} more terms...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="pt-4">
                        <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
                          Claim This Offer
                        </button>
                      </div>
                    </div>

                    {/* Decorative Corner Accent */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-400/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-50 to-blue-50 mb-6 shadow-lg">
                  <Gift className="w-12 h-12 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No {activeTab === 'active' ? 'Active' : 'Upcoming'} Offers
                </h3>
                <p className="text-gray-600 max-w-md mx-auto text-lg">
                  Check back later for new exclusive offers and amazing discounts!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-spacing bg-gradient-to-r from-orange-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto container-spacing text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Don't Miss Out on These Amazing Deals!
          </h2>
          <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our offers and how we can help you achieve your study abroad dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Us Now
            </a>
            <a
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;
