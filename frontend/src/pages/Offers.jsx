import React, { useState } from 'react';
import { Gift, Calendar } from 'lucide-react';

const Offers = () => {
  const [activeTab, setActiveTab] = useState('current');

  const currentOffers = [
    {
      id: 1,
      title: 'Early Bird Registration',
      description: 'Get 20% off on IELTS/PTE preparation classes when you register 30 days before the course starts.',
      discount: '20%',
      validUntil: 'December 31, 2025',
      category: 'Test Prep',
      terms: ['Valid for new registrations only', 'Cannot be combined with other offers', 'Minimum course duration: 4 weeks']
    },
    {
      id: 2,
      title: 'Student Bundle Package',
      description: 'Complete study abroad package including visa counseling, test prep, and university application assistance.',
      discount: '₹15,000',
      validUntil: 'Ongoing',
      category: 'Package',
      terms: ['Includes IELTS preparation', 'Visa consultation included', 'University shortlisting assistance']
    },
    {
      id: 3,
      title: 'Group Discount',
      description: 'Bring 3 or more friends and get 15% off for each member of the group.',
      discount: '15%',
      validUntil: 'January 15, 2026',
      category: 'Group',
      terms: ['Minimum 3 participants', 'Same course enrollment required', 'Valid for all courses']
    },
    {
      id: 4,
      title: 'Referral Program',
      description: 'Refer a friend who enrolls in any course and both get ₹5,000 off.',
      discount: '₹5,000',
      validUntil: 'Ongoing',
      category: 'Referral',
      terms: ['Valid for first-time students only', 'Friend must complete enrollment', 'Maximum 3 referrals per student']
    }
  ];

  const upcomingOffers = [
    {
      id: 5,
      title: 'Summer Special',
      description: 'Special summer rates for all language courses and visa services.',
      discount: 'Up to 25%',
      validUntil: 'March 15, 2026',
      category: 'Seasonal',
      terms: ['Valid during summer months', 'Limited time offer', 'Selected courses only']
    },
    {
      id: 6,
      title: 'University Partnership Deal',
      description: 'Exclusive discounts for students applying to our partner universities.',
      discount: '₹10,000',
      validUntil: 'April 30, 2026',
      category: 'Partnership',
      terms: ['Valid for partner universities only', 'Additional application fee waiver', 'Conditional offer']
    }
  ];

  const offers = activeTab === 'current' ? currentOffers : upcomingOffers;

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

          {/* Offers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className="group relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 animate-fade-in-up border border-gray-100 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >


                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300 z-10">
                  {offer.discount} OFF
                </div>

                {/* Main Content */}
                <div className="relative z-10">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors duration-300">
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm mb-6 line-clamp-3">
                    {offer.description}
                  </p>

                  {/* Category Tag */}
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 mb-4">
                    {offer.category}
                  </div>

                  {/* Validity */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="bg-gray-100 px-3 py-1 rounded-full"><span className="font-bold">Valid:</span> {offer.validUntil}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Offers;