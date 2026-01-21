import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminPrograms = () => {
  const { programs, universities, addProgram, updateProgram, deleteProgram } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    university: '',
    country: '',
    location: '',
    duration: '',
    studyMode: 'Full-time',
    ieltsRequired: true,
    ieltsScore: '',
    languageTest: 'IELTS',
    studyLevel: 'Bachelor',
    intakeDates: '',
    tuitionFee: '',
    requirements: '',
    description: '',
    scholarshipInfo: '',
    careerOpportunities: '',
    status: 'Active'
  });

  const handleAddProgram = () => {
    setEditingProgram(null);
    setFormData({
      title: '',
      university: '',
      country: '',
      location: '',
      duration: '',
      studyMode: 'Full-time',
      ieltsRequired: true,
      ieltsScore: '',
      languageTest: 'IELTS',
      studyLevel: 'Bachelor',
      intakeDates: '',
      tuitionFee: '',
      requirements: '',
      description: '',
      scholarshipInfo: '',
      careerOpportunities: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      university: program.university,
      country: program.country,
      location: program.location || '',
      duration: program.duration,
      studyMode: program.studyMode,
      ieltsRequired: program.ieltsRequired,
      ieltsScore: program.ieltsScore || '',
      languageTest: program.languageTest,
      studyLevel: program.studyLevel,
      intakeDates: program.intakeDates.join(', '),
      tuitionFee: program.tuitionFee,
      requirements: program.requirements.join('\n'),
      description: program.description,
      scholarshipInfo: program.scholarshipInfo,
      careerOpportunities: program.careerOpportunities.join(', '),
      status: program.status
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const programData = {
      ...formData,
      intakeDates: formData.intakeDates.split(',').map(s => s.trim()).filter(Boolean),
      requirements: formData.requirements.split('\n').map(s => s.trim()).filter(Boolean),
      careerOpportunities: formData.careerOpportunities.split(',').map(s => s.trim()).filter(Boolean),
      universityLogo: ''
    };

    if (editingProgram) {
      updateProgram(editingProgram.id, programData);
    } else {
      addProgram(programData);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProgram(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      deleteProgram(id);
    }
  };

  const handleUniversityChange = (e) => {
    const selectedUni = universities.find(u => u.name === e.target.value);
    setFormData({
      ...formData,
      university: e.target.value,
      country: selectedUni ? selectedUni.country : formData.country,
      location: selectedUni ? selectedUni.location : formData.location
    });
  };

  return (
    <>
      <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programs Management</h1>
          <p className="text-gray-600">Manage university programs</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAddProgram}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>➕</span> Add Program
          </button>
        </div>
      </div>

        {/* Programs Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Program</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">University</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Country</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">IELTS</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{program.title}</div>
                      <div className="text-sm text-gray-600">{program.studyLevel}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{program.university}</td>
                    <td className="px-6 py-4 text-gray-600">{program.country}</td>
                    <td className="px-6 py-4 text-gray-600">{program.duration}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {program.ieltsRequired ? program.ieltsScore : 'Not Required'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        program.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {program.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditProgram(program)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(program.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {programs.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No programs added yet. Click "Add Program" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Program Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-2xl sticky top-0">
                <h2 className="text-2xl font-bold text-white">
                  {editingProgram ? 'Edit Program' : 'Add Program'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bachelor of Computer Science"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      University *
                    </label>
                    <select
                      required
                      value={formData.university}
                      onChange={handleUniversityChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select University</option>
                      {universities.map(uni => (
                        <option key={uni.id} value={uni.name}>
                          {uni.name} - {uni.country}{uni.location ? `, ${uni.location}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Australia"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Duration *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 4 Years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Study Mode *
                    </label>
                    <select
                      value={formData.studyMode}
                      onChange={(e) => setFormData({ ...formData, studyMode: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Full-time / Part-time">Full-time / Part-time</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Study Level *
                    </label>
                    <select
                      value={formData.studyLevel}
                      onChange={(e) => setFormData({ ...formData, studyLevel: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Bachelor">Bachelor</option>
                      <option value="Master">Master</option>
                      <option value="Diploma">Diploma</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Language Test *
                    </label>
                    <select
                      value={formData.languageTest}
                      onChange={(e) => setFormData({ ...formData, languageTest: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="IELTS">IELTS</option>
                      <option value="PTE">PTE</option>
                      <option value="Japanese (JLPT)">Japanese (JLPT)</option>
                      <option value="Not Required">Not Required</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 mb-1">
                      <input
                        type="checkbox"
                        checked={formData.ieltsRequired}
                        onChange={(e) => setFormData({ ...formData, ieltsRequired: e.target.checked })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm font-semibold text-gray-700">IELTS Required</span>
                    </label>
                  </div>
                  <div>
                    {formData.ieltsRequired && (
                      <>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          IELTS Score
                        </label>
                        <input
                          type="text"
                          value={formData.ieltsScore}
                          onChange={(e) => setFormData({ ...formData, ieltsScore: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 6.5 (no band less than 6.0)"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Tuition Fee
                    </label>
                    <input
                      type="text"
                      value={formData.tuitionFee}
                      onChange={(e) => setFormData({ ...formData, tuitionFee: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., AUD 35,000/year"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Intake Dates *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.intakeDates}
                      onChange={(e) => setFormData({ ...formData, intakeDates: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., February, July"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Requirements *
                  </label>
                  <textarea
                    required
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter each requirement on a new line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Program description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Scholarship Info
                  </label>
                  <input
                    type="text"
                    value={formData.scholarshipInfo}
                    onChange={(e) => setFormData({ ...formData, scholarshipInfo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Available for eligible students"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Career Opportunities
                  </label>
                  <input
                    type="text"
                    value={formData.careerOpportunities}
                    onChange={(e) => setFormData({ ...formData, careerOpportunities: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Software Developer, Data Scientist"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    {editingProgram ? 'Update Program' : 'Add Program'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPrograms;
