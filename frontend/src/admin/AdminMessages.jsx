import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminMessages = () => {
  const { contactMessages, markContactMessageRead, deleteContactMessage } = useApp();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteContactMessage(id);
    }
  };

  return (
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
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      {!message.read && (
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{message.name}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(message.date).toLocaleDateString()} {new Date(message.date).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <p>📧 {message.email}</p>
                          <p>📞 {message.phone}</p>
                        </div>
                        <div className="mb-3">
                          <span className="text-sm font-semibold text-gray-700">Subject: </span>
                          <span className="text-sm text-gray-900">{message.subject}</span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    {!message.read && (
                      <button
                        onClick={() => markContactMessageRead(message.id)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Mark as Read
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
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              No messages yet. Users will submit messages from the Contact page.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
