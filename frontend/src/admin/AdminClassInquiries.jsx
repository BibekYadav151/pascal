import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, X } from 'lucide-react';

const AdminClassInquiries = () => {
  const { classInquiries, updateClassInquiryStatus, deleteClassInquiry } = useApp();
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    updateClassInquiryStatus(id, newStatus);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      deleteClassInquiry(id);
    }
  };

  const exportToExcel = () => {
    const csvContent = [
      ['Date', 'Student Name', 'Email', 'Phone', 'Class Name', 'Class Time', 'Status', 'Message'],
      ...classInquiries.map(inquiry => [
        new Date(inquiry.date).toLocaleDateString(),
        inquiry.studentName,
        inquiry.email,
        inquiry.phone,
        inquiry.className,
        inquiry.classTime,
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
    a.download = 'class_inquiries.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Class Inquiries</h1>
            <p className="text-gray-600">Manage class application inquiries</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportToExcel}
              disabled={classInquiries.length === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              📥 Export Excel
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-600">{classInquiries.length}</div>
            <div className="text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600">
              {classInquiries.filter(i => i.status === 'New').length}
            </div>
            <div className="text-gray-600">New</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-yellow-600">
              {classInquiries.filter(i => i.status === 'Contacted').length}
            </div>
            <div className="text-gray-600">Contacted</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-600">
              {classInquiries.filter(i => i.status === 'Converted').length}
            </div>
            <div className="text-gray-600">Converted</div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-500 to-orange-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Class Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {classInquiries.length > 0 ? (
                  classInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{inquiry.studentName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{inquiry.email}</div>
                        <div className="text-sm text-gray-600">{inquiry.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{inquiry.className}</div>
                        <div className="text-sm text-gray-600">{inquiry.classTime}</div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            inquiry.status === 'New'
                              ? 'bg-green-100 text-green-800'
                              : inquiry.status === 'Contacted'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {inquiry.message ? (inquiry.message.length > 40 ? `${inquiry.message.substring(0, 40)}...` : inquiry.message) : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(inquiry.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-sm font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No inquiries yet. Students will submit inquiries from the Classes page.
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
                  <h2 className="text-2xl font-bold text-gray-900">Class Inquiry Details</h2>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Class Name</label>
                    <p className="text-gray-900">{selectedInquiry.className}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Class Time</label>
                    <p className="text-gray-900">{selectedInquiry.classTime}</p>
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
                      setSelectedInquiry({...selectedInquiry, status: e.target.value});
                    }}
                    className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Enrolled">Enrolled</option>
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
    </div>
  );
};

export default AdminClassInquiries;
