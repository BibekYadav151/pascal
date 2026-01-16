import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Eye, X } from 'lucide-react';

const AdminMessages = () => {
  const { contactMessages, markContactMessageRead, deleteContactMessage } = useApp();
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteContactMessage(id);
    }
  };

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-600">Manage messages from contact form</p>
      </div>

      {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-600">{contactMessages.length}</div>
            <div className="text-gray-600">Total Messages</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-red-600">
              {contactMessages.filter(m => !m.read).length}
            </div>
            <div className="text-gray-600">Unread</div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {contactMessages.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {contactMessages.slice().reverse().map((message) => (
                <div
                  key={message.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${!message.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {!message.read && (
                        <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-bold text-gray-900">{message.name}</h3>
                          <span className="text-sm text-gray-600">📧 {message.email}</span>
                          <span className="text-sm text-gray-600">📞 {message.phone}</span>
                          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            {message.subject}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(message.date).toLocaleDateString()} at {new Date(message.date).toLocaleTimeString()}
                        </p>
                        <div className="mt-2 bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {message.message}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      {!message.read && (
                        <button
                          onClick={() => markContactMessageRead(message.id)}
                          className="bg-green-100 hover:bg-green-200 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              No messages yet. Users will submit messages from the Contact page.
            </div>
          )}
        </div>

        {/* Message Detail Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Message Details</h2>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900 font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date & Time</label>
                    <p className="text-gray-900">
                      {new Date(selectedMessage.date).toLocaleDateString()} at {new Date(selectedMessage.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{selectedMessage.phone}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <p className="text-gray-900 font-medium">{selectedMessage.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 rounded-lg p-4 mt-1">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  {!selectedMessage.read && (
                    <button
                      onClick={() => {
                        markContactMessageRead(selectedMessage.id);
                        setSelectedMessage(null);
                      }}
                      className="bg-green-100 hover:bg-green-200 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleDelete(selectedMessage.id);
                      setSelectedMessage(null);
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
    </>
  );
};

export default AdminMessages;
