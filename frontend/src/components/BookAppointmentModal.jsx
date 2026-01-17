import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const appointmentTypes = [
  {
    id: 'counseling',
    name: 'Study Abroad Counseling',
    description: 'Get guidance on studying abroad options',
    
  },
  {
    id: 'course-selection',
    name: 'Course Selection',
    description: 'Find the right course for your goals',
    
  },
  {
    id: 'visa-guidance',
    name: 'Visa Guidance',
    description: 'Professional visa application assistance',
    
  },
  {
    id: 'test-prep',
    name: 'Test Preparation',
    description: 'Prepare for IELTS, TOEFL, and more',
    
  },
];

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const BookAppointmentModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    preferredCountry: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save appointment to localStorage
    const appointmentData = {
      id: Date.now(),
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      appointmentType: selectedType,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      preferredCountry: formData.preferredCountry,
      message: formData.message,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Get existing appointments or initialize empty array
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = [...existingAppointments, appointmentData];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedType(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      preferredCountry: '',
      message: '',
    });
    setIsSuccess(false);
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Appointment Type</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Select the type of counseling you need</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointmentTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-6 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 border-2 cursor-pointer transition-all duration-300 ${
                    selectedType === type.id
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{type.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select Date & Time</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Choose your preferred date and time slot</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="inline-block h-4 w-4 mr-2" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate || ''}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Clock className="inline-block h-4 w-4 mr-2" />
                Available Time Slots
              </label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Details</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Please provide your contact information</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Preferred Country (Optional)
                </label>
                <input
                  type="text"
                  value={formData.preferredCountry}
                  onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., USA, UK, Canada"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Any additional information you'd like to share"
                />
              </div>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full mx-auto my-8 transform transition-all">
          {/* Success State */}
          {isSuccess ? (
            <div className="p-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-500 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Appointment Confirmed!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Thank you! Your appointment has been successfully booked.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Appointment Summary:</h4>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p><span className="font-medium">Type:</span> {appointmentTypes.find(t => t.id === selectedType)?.name}</p>
                  <p><span className="font-medium">Date:</span> {selectedDate}</p>
                  <p><span className="font-medium">Time:</span> {selectedTime}</p>
                  <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Book Appointment
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Step {currentStep} of 3
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`h-2 flex-1 mx-1 rounded-full ${
                          step <= currentStep
                            ? 'bg-orange-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {renderStep()}
              </div>
              
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                
                {currentStep === 3 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-medium rounded-lg transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        Confirm Appointment
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !selectedType) ||
                      (currentStep === 2 && (!selectedDate || !selectedTime))
                    }
                    className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-medium rounded-lg transition-colors"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
