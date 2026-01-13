import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useApp();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = adminLogin(formData.email, formData.password);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mb-4">
            <span className="text-white font-bold text-4xl">P</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-gray-600">
            Pascal Institute Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin@pascal.edu.np"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 font-semibold mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-blue-700">
              Email: admin@pascal.edu.np
            </p>
            <p className="text-xs text-blue-700">
              Password: admin123
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
