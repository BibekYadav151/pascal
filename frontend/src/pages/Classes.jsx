import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Classes = () => {
  const { classes, instituteClasses, addClassInquiry } = useApp();
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInstituteDetails, setShowInstituteDetails] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const handleApplyNow = (classItem) => {
    setSelectedClass(classItem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
    setFormData({
      fullName: '',
      contactNumber: '',
      email: '',
      message: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    if (!formData.email.endsWith('@gmail.com')) {
      alert('Please enter a valid Gmail address');
      return;
    }

    addClassInquiry({
      studentName: formData.fullName,
      phone: formData.contactNumber,
      email: formData.email,
      className: selectedClass.title,
      classTime: selectedClass.time,
      message: formData.message
    });

    alert('Your inquiry has been submitted successfully! We will contact you soon.');
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Classes
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join our comprehensive classes and start your journey to success
            </p>
          </div>
        </div>
      </section>

      {/* Available Classes Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Available Classes
            </h2>
            <p className="text-xl text-gray-600">
              Browse our available classes and apply today
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white">
                  <div className="text-3xl font-bold">{classItem.time}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {classItem.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duration: {classItem.duration}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Fee: {classItem.fee}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApplyNow(classItem)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institute Classes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Classes Provided by Pascal Institute
            </h2>
            <p className="text-xl text-gray-600">
              Learn more about our comprehensive course offerings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {instituteClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-blue-900">
                      {classItem.title}
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {classItem.status}
                    </span>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {classItem.duration}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {classItem.fee}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{classItem.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Includes:</h4>
                    <ul className="space-y-2">
                      {classItem.bulletPoints.map((point, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {showInstituteDetails === classItem.id ? (
                    <button
                      onClick={() => setShowInstituteDetails(null)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Show Less
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowInstituteDetails(classItem.id)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Now Modal */}
      {showModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Apply for Class
              </h2>
              <p className="text-blue-100">Fill out the form below to apply</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Auto-filled Info */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={selectedClass.title}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Class Time
                  </label>
                  <input
                    type="text"
                    value={selectedClass.time}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* User Input Fields */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your contact number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email (Gmail) *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="example@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Any additional message..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Submit Inquiry
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
