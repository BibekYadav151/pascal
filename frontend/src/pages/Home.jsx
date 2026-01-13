import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { classes } = useApp();

  const services = [
    {
      icon: '🎓',
      title: 'Student Visa Counseling',
      description: 'Expert guidance for student visa applications and documentation'
    },
    {
      icon: '🌍',
      title: 'Study Abroad Programs',
      description: 'Wide range of study programs in top universities worldwide'
    },
    {
      icon: '📘',
      title: 'IELTS / PTE / Language Classes',
      description: 'Comprehensive test preparation with experienced instructors'
    },
    {
      icon: '📝',
      title: 'Documentation & Interview Prep',
      description: 'Complete support for documentation and interview preparation'
    }
  ];

  const whyChooseUs = [
    'Certified Counselors',
    'High Visa Success Rate',
    'Affordable Fees',
    'Personalized Guidance',
    'Trusted Partner Institutions'
  ];

  const partnerUniversities = [
    { name: 'University of Toronto', country: 'Canada' },
    { name: 'University of Manchester', country: 'UK' },
    { name: 'University of Tasmania', country: 'Australia' },
    { name: 'University of Auckland', country: 'New Zealand' },
    { name: 'TUFS Tokyo', country: 'Japan' },
    { name: 'UOW Australia', country: 'Australia' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight">
                Your Gateway to
                <span className="block text-blue-600">Global Education</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Expert guidance for student visas, test preparation, and international
                admissions. Achieve your dream of studying abroad with Pascal Institute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Explore Programs
                </Link>
                <Link
                  to="/classes"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Apply for Classes
                </Link>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎓</div>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="text-3xl mb-2">🌏</div>
                      <p className="text-sm font-medium text-gray-700">Global Reach</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="text-3xl mb-2">✈️</div>
                      <p className="text-sm font-medium text-gray-700">Study Abroad</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="text-3xl mb-2">🏆</div>
                      <p className="text-sm font-medium text-gray-700">Success Stories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions for your international education journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Classes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Popular Classes
            </h2>
            <p className="text-xl text-gray-600">
              Join our most sought-after preparation classes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.slice(0, 4).map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-blue-600 font-bold text-2xl mb-2">
                  {classItem.time}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {classItem.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Duration: {classItem.duration}
                </p>
                <Link
                  to="/classes"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/classes"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              View All Classes
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                Why Choose Pascal Institute?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                With years of experience and thousands of successful placements,
                we are your trusted partner for international education.
              </p>

              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-blue-50 rounded-lg p-4"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">95%</div>
                <p className="text-xl mb-2">Visa Success Rate</p>
                <p className="text-blue-200">
                  Our students consistently achieve high visa approval rates
                  thanks to our expert guidance and thorough preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Universities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Our Partner Universities
            </h2>
            <p className="text-xl text-gray-600">
              We partner with top universities worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partnerUniversities.map((uni, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center aspect-square"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 text-center">
                  {uni.name}
                </h3>
                <p className="text-xs text-gray-600">{uni.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get in touch with us today and let us help you achieve your dreams of
            studying abroad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
            >
              Contact Us Now
            </Link>
            <Link
              to="/courses"
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
            >
              Browse Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
