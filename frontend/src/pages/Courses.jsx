import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Card, AnimatedButton } from '../components/ui';

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


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="page-top bg-gray-900">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="text-center text-white">
            <h1 className="text-display-lg mb-4">
              Courses & Programs
            </h1>
            <p className="text-body-lg text-gray-300 max-w-2xl mx-auto">
              Explore study programs from top universities worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 md:py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto container-spacing">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by course name or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-12"
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
              className="input-field"
            >
              <option value="">All Countries</option>
              {uniqueCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <select
              value={filters.university}
              onChange={(e) => handleFilterChange('university', e.target.value)}
              className="input-field"
            >
              <option value="">All Universities</option>
              {uniqueUniversities.map(uni => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>

            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              className="input-field"
            >
              <option value="">All Durations</option>
              {uniqueDurations.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>

            <select
              value={filters.ieltsRequired}
              onChange={(e) => handleFilterChange('ieltsRequired', e.target.value)}
              className="input-field"
            >
              <option value="">IELTS Required</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select
              value={filters.languageTest}
              onChange={(e) => handleFilterChange('languageTest', e.target.value)}
              className="input-field"
            >
              <option value="">Language Test</option>
              {uniqueLanguageTests.map(test => (
                <option key={test} value={test}>{test}</option>
              ))}
            </select>

            <select
              value={filters.studyLevel}
              onChange={(e) => handleFilterChange('studyLevel', e.target.value)}
              className="input-field"
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
      <div className="max-w-7xl mx-auto container-spacing py-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredPrograms.length}</span> programs
        </p>
      </div>

      {/* Program Cards */}
      <div className="max-w-7xl mx-auto container-spacing pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program, index) => (
            <Card
              key={program.id}
              className="overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
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

                {/* Program Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Tuition Fees
                    </h4>
                    <p className="text-gray-700 text-sm">{program.tuitionFee}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Intake Dates
                    </h4>
                    <p className="text-gray-700 text-sm">{program.intakeDates.join(', ')}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Entry Requirements
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {program.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Description
                    </h4>
                    <p className="text-gray-700 text-sm">{program.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Scholarship Info
                    </h4>
                    <p className="text-gray-700 text-sm">{program.scholarshipInfo}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
                      </svg>
                      Career Opportunities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.careerOpportunities.map((career, index) => (
                        <span key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <AnimatedButton
                  onClick={() => handleApplyInquiry(program)}
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon="📝"
                >
                  Apply for This Program
                </AnimatedButton>
              </div>

            </Card>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gray-900 p-4 rounded-t-2xl">
              <h2 className="text-lg font-bold text-white">
                Apply for Program
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Auto-filled Info */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Program
                  </label>
                  <input
                    type="text"
                    value={selectedProgram.title}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 rounded text-gray-600 cursor-not-allowed border-0 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      value={selectedProgram.university}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 rounded text-gray-600 cursor-not-allowed border-0 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={selectedProgram.country}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 rounded text-gray-600 cursor-not-allowed border-0 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* User Input Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    placeholder="Your phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="your.email@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  IELTS Score (Optional)
                </label>
                <input
                  type="text"
                  value={formData.ieltsScore}
                  onChange={(e) => setFormData({ ...formData, ieltsScore: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 7.0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field"
                  rows="2"
                  placeholder="Any questions?"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="flex-1"
                >
                  Submit Inquiry
                </AnimatedButton>
                <AnimatedButton
                  type="button"
                  onClick={handleCloseModal}
                  variant="secondary"
                  size="md"
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
