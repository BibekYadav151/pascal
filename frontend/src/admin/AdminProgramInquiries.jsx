import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, X, Download, Trash2, Filter, Search, Calendar, User, Mail, Phone, BookOpen, Clock, Globe, Award } from 'lucide-react';
import { MdTrendingUp, MdNewReleases, MdCheckCircle, MdAssignment } from 'react-icons/md';

const AdminProgramInquiries = () => {
  const { programInquiries, updateProgramInquiryStatus, deleteProgramInquiry } = useApp();
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    updateProgramInquiryStatus(id, newStatus);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      deleteProgramInquiry(id);
    }
  };

  const exportToExcel = () => {
    const csvContent = [
      ['Date', 'Student Name', 'Email', 'Phone', 'Program', 'University', 'Country', 'IELTS Score', 'Status', 'Message'],
      ...programInquiries.map(inquiry => [
        new Date(inquiry.date).toLocaleDateString(),
        inquiry.studentName,
        inquiry.email,
        inquiry.phone,
        inquiry.programName,
        inquiry.university,
        inquiry.country,
        inquiry.ieltsScore || 'N/A',
        inquiry.status,
        inquiry.message || ''
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'program_inquiries.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Program Inquiries</h1>
          <p className="text-gray-600">Manage program application inquiries</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportToExcel}
            disabled={programInquiries.length === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <MdAssignment size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{programInquiries.length}</div>
            <div className="text-sm text-gray-600 font-medium">Total Inquiries</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <MdNewReleases size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {programInquiries.filter(i => i.status === 'New').length}
            </div>
            <div className="text-sm text-gray-600 font-medium">New Applications</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <MdTrendingUp size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {programInquiries.filter(i => i.status === 'Contacted').length}
            </div>
            <div className="text-sm text-gray-600 font-medium">In Progress</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <MdCheckCircle size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {programInquiries.filter(i => i.status === 'Converted').length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Converted</div>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">University</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">IELTS</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {programInquiries.length > 0 ? (
                programInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(inquiry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{inquiry.studentName}</div>
                      <div className="text-sm text-gray-600">{inquiry.email}</div>
                      <div className="text-sm text-gray-600">{inquiry.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 text-sm">{inquiry.programName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inquiry.university}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inquiry.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inquiry.ieltsScore || '-'}</td>
                    <td className="px-6 py-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border-none ring-1 ring-inset ${inquiry.status === 'New'
                          ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                          : inquiry.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-700 ring-amber-600/20'
                            : 'bg-indigo-50 text-indigo-700 ring-indigo-600/20'
                          }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No inquiries yet. Students will submit inquiries from the Courses page.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Program Inquiry Details</h2>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name</label>
                  <p className="text-gray-900 font-medium">{selectedInquiry.studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">
                    {new Date(selectedInquiry.date).toLocaleDateString()} at {new Date(selectedInquiry.date).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedInquiry.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedInquiry.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Program</label>
                  <p className="text-gray-900">{selectedInquiry.programName}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">University</label>
                  <p className="text-gray-900">{selectedInquiry.university}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                  <p className="text-gray-900">{selectedInquiry.country}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">IELTS Score</label>
                  <p className="text-gray-900">{selectedInquiry.ieltsScore || 'Not specified'}</p>
                </div>
              </div>

              {selectedInquiry.message && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 rounded-lg p-4 mt-1">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => {
                    handleStatusChange(selectedInquiry.id, e.target.value);
                    setSelectedInquiry({ ...selectedInquiry, status: e.target.value });
                  }}
                  className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedInquiry.id);
                    setSelectedInquiry(null);
                  }}
                  className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProgramInquiries;
