import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { classes } = useApp();

  const services = [
    {
      icon: '🎓',
      title: 'Student Visa Counseling',
      description: 'Expert guidance for student visa applications'
    },
    {
      icon: '🌍',
      title: 'Study Abroad Programs',
      description: 'Wide range of programs in top universities'
    },
    {
      icon: '📘',
      title: 'IELTS / PTE / Language Classes',
      description: 'Comprehensive test preparation'
    },
    {
      icon: '📝',
      title: 'Documentation & Interview Prep',
      description: 'Complete support for applications'
    }
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
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                🎓 Start Your Journey Today
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Gateway to{' '}
                <span className="text-blue-600">Global Education</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Expert guidance for student visas, test preparation, and international admissions.
                Achieve your dream of studying abroad with Pascal Institute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Explore Programs
                </Link>
                <Link
                  to="/classes"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  Apply for Classes
                </Link>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-3">🌏</div>
                    <p className="text-sm font-medium text-gray-900">Global Reach</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-3">✈️</div>
                    <p className="text-sm font-medium text-gray-900">Study Abroad</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-3">🏆</div>
                    <p className="text-sm font-medium text-gray-900">Success Stories</p>
                  </div>
                </div>
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold text-blue-600">95%</div>
                    <div>
                      <p className="text-sm text-gray-600">Visa Success</p>
                      <p className="text-xs text-gray-500">Rate</p>
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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for your international education journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Classes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Popular Classes
              </h2>
              <p className="text-lg text-gray-600">
                Join our most sought-after preparation classes
              </p>
            </div>
            <Link
              to="/classes"
              className="hidden md:inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              View All Classes
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.slice(0, 4).map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="text-blue-600 font-semibold text-xl mb-3">
                  {classItem.time}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {classItem.title}
                </h3>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {classItem.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {classItem.fee}
                  </span>
                </div>
                <Link
                  to="/classes"
                  className="block w-full text-center bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/classes"
              className="block w-full text-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300"
            >
              View All Classes
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-6">
                ✓ Why Choose Us
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Education Partner
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With years of experience and thousands of successful placements,
                we are your trusted partner for international education.
              </p>

              <div className="space-y-4">
                {['Certified Counselors', 'High Visa Success Rate', 'Affordable Fees', 'Personalized Guidance', 'Trusted Partner Institutions'].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-base font-medium text-gray-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 text-white">
              <div className="text-center">
                <div className="text-7xl font-bold mb-4">1000+</div>
                <p className="text-xl mb-6 text-blue-100">Students Placed</p>
                <p className="text-sm text-blue-200 leading-relaxed">
                  Join thousands of students who have successfully achieved their dreams of studying abroad with our expert guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Universities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partner Universities
            </h2>
            <p className="text-lg text-gray-600">
              We partner with top universities worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partnerUniversities.map((uni, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
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
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Get in touch with us today and let us help you achieve your dreams of studying abroad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Contact Us Now
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all duration-200"
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
