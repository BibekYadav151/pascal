import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChatClick = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = "+977XXXXXXXXX"; // Replace with actual number
    const message = "Hello! I'm interested in Pascal Institute services. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Open WhatsApp Chat"
        >
          <FaWhatsapp className="w-6 h-6" />
        </button>
      </div>

      {/* Sliding Panel - WhatsApp Style */}
      <div
        className={`fixed bottom-24 right-6 bg-white rounded-lg shadow-2xl border border-gray-200 z-40 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? 'opacity-100 translate-y-0 w-80 h-96'
            : 'opacity-0 translate-y-4 w-0 h-0'
        }`}
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(1rem)',
        }}
      >
        {/* WhatsApp Header */}
        <div className="bg-green-500 text-white p-4 flex items-center">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
            <FaWhatsapp className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">Pascal Institute</h3>
            <p className="text-xs opacity-90">online</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
          {/* Welcome Message from Pascal */}
          <div className="flex mb-4">
            <div className="bg-white rounded-lg rounded-tl-none px-4 py-2 shadow-sm max-w-xs">
              <p className="text-sm text-gray-800">👋 Hi there! Welcome to Pascal Institute</p>
              <p className="text-xs text-gray-500 mt-1">{getCurrentTime()}</p>
            </div>
          </div>

          {/* Second Message */}
          <div className="flex mb-4">
            <div className="bg-white rounded-lg rounded-tl-none px-4 py-2 shadow-sm max-w-xs">
              <p className="text-sm text-gray-800">How can I help you today? We're here to assist with your educational journey abroad.</p>
              <p className="text-xs text-gray-500 mt-1">{getCurrentTime()}</p>
            </div>
          </div>
        </div>

        {/* Message Input Area */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={handleChatClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Click to Chat</span>
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">
            Start a conversation with our team
          </p>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WhatsAppButton;