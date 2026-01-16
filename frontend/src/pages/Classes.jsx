import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { AnimatedButton, Card } from "../components/ui";
import { SiGoogleclassroom } from "react-icons/si";
import { IoBookSharp } from "react-icons/io5";

const Classes = () => {
  const { classes, instituteClasses, addClassInquiry } = useApp();
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    message: "",
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const handleApplyNow = (classItem) => {
    setSelectedClass(classItem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
    setSelectedTimeSlot("");
    setFormData({
      fullName: "",
      contactNumber: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      return;
    }

    addClassInquiry({
      studentName: formData.fullName,
      phone: formData.contactNumber,
      email: formData.email,
      className: selectedClass.title,
      classTime:
        selectedTimeSlot ||
        selectedClass.timeSlots?.[0]?.time ||
        selectedClass.time,
      message: formData.message,
    });

    alert(
      "Your inquiry has been submitted successfully! We will contact you soon."
    );
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="page-top bg-white relative">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center">
            <h1 className="text-display-lg text-gray-900 mb-4">Our Classes</h1>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
              Join our comprehensive classes and start your journey to success
            </p>
          </div>
        </div>
      </section>

      {/* Available Classes Section */}

      <section className="section-spacing  bg-gray-50">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full gap-2 bg-white/50 text-gray-900 text-sm font-medium border border-white/700">
            <SiGoogleclassroom className="w-4 h-4" />
            Running Classes
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="group p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-title-md text-gray-900 flex-1">
                    {classItem.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-md ml-4 ${
                      classItem.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {classItem.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {classItem.timeSlots?.map((slot, index) => (
                        <span key={index} className="text-body-sm">
                          {slot.time}
                          {index < classItem.timeSlots.length - 1 ? ", " : ""}
                        </span>
                      )) || (
                        <span className="text-body-sm">{classItem.time}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001-.946 5.39 3.42 3.42 0 014.383 1.912 3.42 3.42 0 001.946-5.39l.001-.005a3.42 3.42 0 00-.002-6.78l-.001-.005a3.42 3.42 0 00-4.383-1.912 3.42 3.42 0 00-1.946 5.39z"
                        />
                      </svg>
                    </div>
                    <span className="text-body-sm">{classItem.duration}</span>
                  </div>
                  {classItem.fee && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-body-sm">{classItem.fee}</span>
                    </div>
                  )}
                </div>

                <AnimatedButton
                  onClick={() => handleApplyNow(classItem)}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Apply Now
                </AnimatedButton>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Institute Classes Section */}
      <section className="section-spacing bg-white">
        <div className="relative max-w-7xl mx-auto container-spacing">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white-100 text-gray-700 text-sm font-medium mb-6 border border-gray-200">
              <IoBookSharp />
              All Programs
            </div>
            <h2 className="text-display-md text-gray-900 mb-6">
              Classes Provided by Pascal Institute
            </h2>
            <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about our comprehensive course offerings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {instituteClasses.map((classItem) => (
              <Card key={classItem.id} className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-title-lg text-gray-900 flex-1">
                    {classItem.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ml-4 ${
                      classItem.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {classItem.status}
                  </span>
                </div>

                <div className="flex gap-6 mb-6 pb-6 border-b border-gray-100">
                  {classItem.duration && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-body-sm">{classItem.duration}</span>
                    </div>
                  )}
                  {classItem.fee && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-5 h-5 bg-gray-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-body-sm">{classItem.fee}</span>
                    </div>
                  )}
                </div>

                {classItem.description && (
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {classItem.description}
                  </p>
                )}

                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-4">
                    What's Included:
                  </p>
                  <ul className="grid grid-cols-2 gap-2">
                    {classItem.bulletPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-green-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Now Modal */}
      {showModal && selectedClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gray-900 p-4 rounded-t-2xl">
              <h2 className="text-lg font-bold text-white">Apply for Class</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Auto-filled Info */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Class Name
                  </label>
                  <input
                    type="text"
                    value={selectedClass.title}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 rounded text-gray-600 cursor-not-allowed border-0 text-sm"
                  />
                </div>
                {selectedClass.timeSlots &&
                selectedClass.timeSlots.length > 1 ? (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Select Time Slot *
                    </label>
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                      required
                    >
                      <option value="">Choose a time slot</option>
                      {selectedClass.timeSlots
                        .filter((slot) => slot.available)
                        .map((slot, index) => (
                          <option key={index} value={slot.time}>
                            {slot.time}
                          </option>
                        ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Class Time
                    </label>
                    <input
                      type="text"
                      value={
                        selectedClass.timeSlots?.[0]?.time ||
                        selectedClass.time ||
                        "TBD"
                      }
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 rounded text-gray-600 cursor-not-allowed border-0 text-sm"
                    />
                  </div>
                )}
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
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
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                    placeholder="Your phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Gmail Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                  placeholder="your.email@gmail.com"
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                  rows="2"
                  placeholder="Any questions?"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="flex-1"
                >
                  Apply Now
                </AnimatedButton>
                <AnimatedButton
                  type="button"
                  onClick={handleCloseModal}
                  variant="secondary"
                  size="sm"
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

export default Classes;
