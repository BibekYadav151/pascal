import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

const Courses = () => {
  const { programs, addProgramInquiry } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    university: '',
    duration: '',
    ieltsRequired: '',
    languageTest: '',
    studyLevel: ''
  });
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ieltsScore: '',
    message: ''
  });

  // Get unique filter options
  const uniqueCountries = [...new Set(programs.map(p => p.country))];
  const uniqueUniversities = [...new Set(programs.map(p => p.university))];
  const uniqueDurations = [...new Set(programs.map(p => p.duration))];
  const uniqueLanguageTests = [...new Set(programs.map(p => p.languageTest))];
  const uniqueStudyLevels = [...new Set(programs.map(p => p.studyLevel))];

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const matchesSearch =
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.university.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = !filters.country || program.country === filters.country;
      const matchesUniversity = !filters.university || program.university === filters.university;
      const matchesDuration = !filters.duration || program.duration === filters.duration;
      const matchesIelts = !filters.ieltsRequired ||
        (filters.ieltsRequired === 'yes' && program.ieltsRequired) ||
        (filters.ieltsRequired === 'no' && !program.ieltsRequired);
      const matchesLanguageTest = !filters.languageTest || program.languageTest === filters.languageTest;
      const matchesStudyLevel = !filters.studyLevel || program.studyLevel === filters.studyLevel;

      return matchesSearch && matchesCountry && matchesUniversity &&
             matchesDuration && matchesIelts && matchesLanguageTest && matchesStudyLevel;
    });
  }, [programs, searchQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      country: '',
      university: '',
      duration: '',
      ieltsRequired: '',
      languageTest: '',
      studyLevel: ''
    });
    setSearchQuery('');
  };

  const handleApplyInquiry = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      ieltsScore: '',
      message: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addProgramInquiry({
      studentName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      programName: selectedProgram.title,
      university: selectedProgram.university,
      country: selectedProgram.country,
      ieltsScore: formData.ieltsScore,
      message: formData.message
    });

    alert('Your inquiry has been submitted successfully! We will contact you soon.');
    handleCloseModal();
  };

  const toggleDetails = (programId) => {
    setShowDetails(showDetails === programId ? null : programId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Courses & Programs
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore study programs from top universities worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by course name or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <select
              value={filters.country}
              onChange={(e) => handleFilterChange('country', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Countries</option>
              {uniqueCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <select
              value={filters.university}
              onChange={(e) => handleFilterChange('university', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Universities</option>
              {uniqueUniversities.map(uni => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>

            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Durations</option>
              {uniqueDurations.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>

            <select
              value={filters.ieltsRequired}
              onChange={(e) => handleFilterChange('ieltsRequired', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">IELTS Required</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select
              value={filters.languageTest}
              onChange={(e) => handleFilterChange('languageTest', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Language Test</option>
              {uniqueLanguageTests.map(test => (
                <option key={test} value={test}>{test}</option>
              ))}
            </select>

            <select
              value={filters.studyLevel}
              onChange={(e) => handleFilterChange('studyLevel', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Study Level</option>
              {uniqueStudyLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {(searchQuery || Object.values(filters).some(v => v)) && (
            <div className="mt-4 text-center">
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredPrograms.length}</span> programs
        </p>
      </div>

      {/* Program Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white">
                <div className="text-xs uppercase tracking-wide opacity-80 mb-1">
                  {program.studyLevel}
                </div>
                <h3 className="text-lg font-bold line-clamp-2">
                  {program.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="truncate">{program.university}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{program.country}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{program.duration}</span>
                    {program.studyMode !== program.duration && (
                      <span className="ml-2 text-gray-500">({program.studyMode})</span>
                    )}
                  </div>
                </div>

                {/* IELTS Requirement */}
                {program.ieltsRequired && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center text-sm text-blue-900">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">IELTS: {program.ieltsScore}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleDetails(program.id)}
                    className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    {showDetails === program.id ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => handleApplyInquiry(program)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Apply Inquiry
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {showDetails === program.id && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Tuition Fees</h4>
                      <p className="text-gray-600">{program.tuitionFee}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Intake Dates</h4>
                      <p className="text-gray-600">{program.intakeDates.join(', ')}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Entry Requirements</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {program.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Description</h4>
                      <p className="text-gray-600">{program.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Scholarship Info</h4>
                      <p className="text-gray-600">{program.scholarshipInfo}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Career Opportunities</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.careerOpportunities.map((career, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Programs Found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find more programs.
            </p>
          </div>
        )}
      </div>

      {/* Apply Inquiry Modal */}
      {showModal && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Apply for Program
              </h2>
              <p className="text-blue-100">Fill out the form to inquire about this program</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Auto-filled Info */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Program Name
                  </label>
                  <input
                    type="text"
                    value={selectedProgram.title}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      value={selectedProgram.university}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={selectedProgram.country}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>
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
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  IELTS Score (Optional)
                </label>
                <input
                  type="text"
                  value={formData.ieltsScore}
                  onChange={(e) => setFormData({ ...formData, ieltsScore: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 7.0"
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

export default Courses;
