import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminInstituteClasses = () => {
  const { instituteClasses, addInstituteClass, updateInstituteClass, deleteInstituteClass } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    fee: '',
    description: '',
    bulletPoints: '',
    status: 'Active'
  });

  const handleAddClass = () => {
    setEditingClass(null);
    setFormData({
      title: '',
      duration: '',
      fee: '',
      description: '',
      bulletPoints: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setFormData({
      title: classItem.title,
      duration: classItem.duration,
      fee: classItem.fee,
      description: classItem.description,
      bulletPoints: classItem.bulletPoints.join('\n'),
      status: classItem.status
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const classData = {
      ...formData,
      bulletPoints: formData.bulletPoints.split('\n').map(s => s.trim()).filter(Boolean)
    };

    if (editingClass) {
      updateInstituteClass(editingClass.id, classData);
    } else {
      addInstituteClass(classData);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClass(null);
    setFormData({
      title: '',
      duration: '',
      fee: '',
      description: '',
      bulletPoints: '',
      status: 'Active'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      deleteInstituteClass(id);
    }
  };

  return (
    <>
      <div className="space-y-6">
     {/* Header with Actions */}
     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
       <div>
         <h1 className="text-3xl font-bold text-gray-900">Institute Classes</h1>
         <p className="text-gray-600">Manage classes provided by Pascal Institute</p>
       </div>

       <div className="flex flex-wrap gap-3">
         <button
           onClick={handleAddClass}
           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
         >
           <span>➕</span> Add Class
         </button>
       </div>
     </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instituteClasses.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{classItem.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    classItem.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {classItem.status}
                  </span>
                </div>
                <div className="flex gap-4 mb-4 text-sm text-gray-600">
                  <span>⏱ {classItem.duration}</span>
                  <span>💰 {classItem.fee}</span>
                </div>
                <p className="text-gray-600 mb-4">{classItem.description}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {classItem.bulletPoints.slice(0, 3).map((point, index) => (
                      <li key={index}>• {point}</li>
                    ))}
                    {classItem.bulletPoints.length > 3 && (
                      <li className="text-gray-500">+ {classItem.bulletPoints.length - 3} more</li>
                    )}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClass(classItem)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(classItem.id)}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {instituteClasses.length === 0 && (
            <div className="col-span-3 bg-white rounded-xl p-12 text-center text-gray-500 shadow-lg">
              No institute classes added yet. Click "Add Class" to create one.
            </div>
          )}
        </div>

        {/* Add/Edit Class Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold text-white">
                  {editingClass ? 'Edit Class' : 'Add Class'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Class Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Accounting Package"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 3 Months"
                    />
                  </div>
                  <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Fee
                  </label>
                  <input
                    type="text"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., NPR 8,000"
                  />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Class description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Bullet Points (one per line) *
                  </label>
                  <textarea
                    required
                    value={formData.bulletPoints}
                    onChange={(e) => setFormData({ ...formData, bulletPoints: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Tally&#10;Excel&#10;FACT&#10;MS Access"
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
                    {editingClass ? 'Update Class' : 'Add Class'}
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

export default AdminInstituteClasses;
