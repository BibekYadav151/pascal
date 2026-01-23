import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { Card, AnimatedButton } from "../components/ui";
import { SiGooglemaps } from "react-icons/si";
import { GiDuration } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsAwardFill } from "react-icons/bs";
import { ChevronDown } from "lucide-react";

import { usePrograms, useUniversities } from "../hooks/usePrograms";

const Courses = () => {
  const { data: programsResponse } = usePrograms();
  const programs = programsResponse?.data || [];

  const { data: universitiesResponse } = useUniversities();
  const universities = universitiesResponse?.data || [];

  const { addProgramInquiry } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    country: "",
    university: "",
    duration: "",
    ieltsRequired: "",
    languageTest: "",
    studyLevel: "",
  });
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedCards, setExpandedCards] = useState(new Set());

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    ieltsScore: "",
    message: "",
  });

  // Get unique filter options
  const uniqueCountries = [...new Set(programs.map((p) => p.country))];
  const uniqueUniversities = [...new Set(programs.map((p) => p.university))];
  const uniqueDurations = [...new Set(programs.map((p) => p.duration))];
  const uniqueLanguageTests = [...new Set(programs.map((p) => p.languageTest))];
  const uniqueStudyLevels = [...new Set(programs.map((p) => p.studyLevel))];

  // Create university website mapping
  const getUniversityWebsite = (universityName) => {
    const university = universities.find((uni) => uni.name === universityName);
    return university?.website || null;
  };

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch =
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (program.location && program.location.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCountry =
        !filters.country || program.country === filters.country;
      const matchesUniversity =
        !filters.university || program.university === filters.university;
      const matchesDuration =
        !filters.duration || program.duration === filters.duration;
      const matchesIelts =
        !filters.ieltsRequired ||
        (filters.ieltsRequired === "yes" && program.ieltsRequired) ||
        (filters.ieltsRequired === "no" && !program.ieltsRequired);
      const matchesLanguageTest =
        !filters.languageTest || program.languageTest === filters.languageTest;
      const matchesStudyLevel =
        !filters.studyLevel || program.studyLevel === filters.studyLevel;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesUniversity &&
        matchesDuration &&
        matchesIelts &&
        matchesLanguageTest &&
        matchesStudyLevel
      );
    });
  }, [programs, searchQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      country: "",
      university: "",
      duration: "",
      ieltsRequired: "",
      languageTest: "",
      studyLevel: "",
    });
    setSearchQuery("");
  };

  const toggleCardExpansion = (programId) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(programId)) {
        newSet.delete(programId);
      } else {
        newSet.add(programId);
      }
      return newSet;
    });
  };

  const handleApplyInquiry = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      ieltsScore: "",
      message: "",
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
      message: formData.message,
    });

    alert(
      "Your inquiry has been submitted successfully! We will contact you soon."
    );
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="page-top bg-white relative">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="text-center text-gray-900">
            <h1 className="text-display-lg  mb-4">Courses & Programs</h1>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
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
                placeholder="Search by course name, university, country, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-12"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <select
              value={filters.country}
              onChange={(e) => handleFilterChange("country", e.target.value)}
              className="input-field"
            >
              <option value="">All Countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={filters.university}
              onChange={(e) => handleFilterChange("university", e.target.value)}
              className="input-field"
            >
              <option value="">All Universities</option>
              {uniqueUniversities.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>

            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="input-field"
            >
              <option value="">All Durations</option>
              {uniqueDurations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>

            <select
              value={filters.ieltsRequired}
              onChange={(e) =>
                handleFilterChange("ieltsRequired", e.target.value)
              }
              className="input-field"
            >
              <option value="">IELTS Required</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select
              value={filters.languageTest}
              onChange={(e) =>
                handleFilterChange("languageTest", e.target.value)
              }
              className="input-field"
            >
              <option value="">Language Test</option>
              {uniqueLanguageTests.map((test) => (
                <option key={test} value={test}>
                  {test}
                </option>
              ))}
            </select>

            <select
              value={filters.studyLevel}
              onChange={(e) => handleFilterChange("studyLevel", e.target.value)}
              className="input-field"
            >
              <option value="">Study Level</option>
              {uniqueStudyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || Object.values(filters).some((v) => v)) && (
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
          Showing{" "}
          <span className="font-semibold">{filteredPrograms.length}</span>{" "}
          programs
        </p>
      </div>

      {/* Program Cards */}
      <div className="max-w-7xl mx-auto container-spacing pb-12">
        <div className="flex flex-col gap-3">
          {filteredPrograms.map((program, index) => (
            <Card
              key={program.id}
              className="group hover:shadow-lg transition-all duration-200"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="p-4">
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-wide text-orange-600 font-semibold mb-1">
                      {program.studyLevel}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2">
                      {program.title}
                    </h3>

                    {/* Essential Info in Row */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="truncate ml-1">
                          {getUniversityWebsite(program.university) ? (
                            <a href={getUniversityWebsite(program.university)} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                              {program.university}
                            </a>
                          ) : (
                            program.university
                          )}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <SiGooglemaps size={14} className="mr-1 text-blue-500 flex-shrink-0" />
                        <span>{program.country}{program.location && `, ${program.location}`}</span>
                      </div>

                      <div className="flex items-center">
                        <GiDuration size={14} className="mr-1 text-blue-500 flex-shrink-0" />
                        <span>{program.duration}</span>
                        {program.studyMode !== program.duration && (
                          <span className="ml-1 text-gray-500">({program.studyMode})</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expand/Apply Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleCardExpansion(program.id)}
                      className="p-2 bg-gray-100 hover:bg-orange-200 text-gray-600 hover:text-gray-800 rounded-full transition-colors shadow-sm hover:shadow-md"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${expandedCards.has(program.id) ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatedButton
                      onClick={() => handleApplyInquiry(program)}
                      variant="outline"
                      size="sm"
                      className="border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white"
                    >
                      Apply
                    </AnimatedButton>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedCards.has(program.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                    {/* IELTS Score */}
                    {program.ieltsRequired && (
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-orange-700">IELTS: {program.ieltsScore}</span>
                      </div>
                    )}

                    {/* Tuition Fee */}
                    {program.tuitionFee && program.tuitionFee.trim() !== "" && (
                      <div className="flex items-start text-sm">
                        <GiTakeMyMoney size={16} className="mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-900">Tuition Fee: </span>
                          <span className="text-gray-700">{program.tuitionFee}</span>
                        </div>
                      </div>
                    )}

                    {/* Intake Dates */}
                    <div className="flex items-start text-sm">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-900">Intake Dates: </span>
                        <span className="text-gray-700">{program.intakeDates.join(", ")}</span>
                      </div>
                    </div>

                    {/* Entry Requirements */}
                    <div className="flex items-start text-sm">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Entry Requirements:</span>
                        <ul className="mt-1 ml-6 list-disc text-gray-700 space-y-1">
                          {program.requirements.map((req, index) => (
                            <li key={index} className="text-xs">{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex items-start text-sm">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Description: </span>
                        <span className="text-gray-700">{program.description}</span>
                      </div>
                    </div>

                    {/* Scholarship Info */}
                    {program.scholarshipInfo && program.scholarshipInfo.trim() !== "" && (
                      <div className="flex items-start text-sm">
                        <svg className="w-4 h-4 mr-2 mt-0.5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1">
                          <span className="font-medium text-gray-900">Scholarship Info: </span>
                          <span className="text-gray-700">{program.scholarshipInfo}</span>
                        </div>
                      </div>
                    )}

                    {/* Career Opportunities */}
                    {program.careerOpportunities && program.careerOpportunities.length > 0 && program.careerOpportunities.some(career => career.trim() !== "") && (
                      <div className="flex items-start text-sm">
                        <BsAwardFill size={16} className="mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                        <div className="flex-1">
                          <span className="font-medium text-gray-900">Career Opportunities: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {program.careerOpportunities.map((career, index) => (
                              <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium border border-yellow-200">
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Programs Found
            </h3>
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
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, ieltsScore: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
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
